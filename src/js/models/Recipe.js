import axios from 'axios';
import { key, proxy } from '../config'

// 这就是我们要export出去的class
export default class Recipe{
    // 这里的流程是用id做AJAX call，找到recipe剩下的信息
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            // 这里的axios功能是fetch信息
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    calcTime(){
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15; 
    }

    // 这里太懒了，直接就这样了吧
    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            // 通过array操作做交换
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            // 把括号里的东西连带括号一起去掉，看看MDN正则表达式?
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            // 3) Parse ingredient into count, unit and ingredient
            return ingredient;
        });
        this.ingredients = newIngredients
    }
}
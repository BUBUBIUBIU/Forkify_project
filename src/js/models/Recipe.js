import axios from 'axios';
// import { key, proxy } from '../config'

// 这就是我们要export出去的class
export default class Recipe{
    // 这里的流程是用id做AJAX call，找到recipe剩下的信息
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            // 这里的axios功能是fetch信息
            // const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`); The food2fork is shutdown
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            // console.log(res);
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
        // 注意加s的复数要放在前面，不然有miss match的现象
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        // 用destructuring的方式扩充了array
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            // 通过array操作做交换
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            // 把括号里的东西连带括号一起去掉，看看MDN正则表达式?
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredient into count, unit and ingredient
            // 这里把每个ingredient的string拆分成每一个字段，并且check每一个字段是否是单位；这个任务用到了一个
            // 强力method findIndex
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            // 接下来就是一些琐碎的事情，根据unitIndex返回的不同结果做出判断
            let objIng;
            if (unitIndex > -1){
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1){
                    // 对string直接做运算的method
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            }else if(parseInt(arrIng[0], 10)){
                // There is No unit, but 1st element is number (这里做了一点假设)
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    // 去掉第一个
                    ingredient: arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1){
                // There is No unit and No number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    // 这里提供一个ES6的新功能，在设置object property的时候直接放一个ingredient在里面
                    // 效果相当于 ingredient = ingredient（外部）；减少冗余代码
                    ingredient
                }

            }

            return objIng;
        });
        this.ingredients = newIngredients
    }

    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings/this.servings);
        })

        this.servings = newServings;
    }
}
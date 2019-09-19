// Global app controller
/*
import num from './test';  // x储存了23

    // And now right now this wouldn't actually work
    // in the browser if we weren't to use webpack.
    // So we really need webpack now
    // in order to bundle these together.
    
const x=23
console.log(`I imported ${num} from another module called test.js! Variable x is ${x}`);

// 这里不用写.js的后缀
import str from './models/Search'

// import多个东西的时候, 用named import，注意名称要对上
import { add, multiply, ID } from './views/searchView';
console.log(`Using imported function! ${add(ID, 2)} and ${multiply(3, 5)}. ${str}.`);

// 当应用的名字和原module不同时，有两种方法
// 1. as 关键字
import { add as a, multiply as m, ID as id} from './views/searchView';
console.log(`Using imported function! ${a(id, 2)} and ${m(3, 5)}. ${str}.`);

// 2. * 代表import整个file
import * as searchView from './views/searchView';
console.log(`${searchView.add(3, 5)}`);
*/

import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

// 每次reload app后，这个state就会成empty，我们得想办法让某些数据保持persist
const state = {}

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query){
        // 2) New search objcet and add to state
        state.search = new Search(query);
        
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4) Search for recipe;
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            alert('Something wrong with the search...');
            console.log(err);
            // 就算没有显示出结果，也要把那个旋转的圈圈去掉哦
            clearLoader();
        }
    }
}

// 好像用到了事件代理?
// 这里不想让page reload 
elements.searchForm.addEventListener('submit', e=>{
    /**
     * So whenever we submit the form, we prevent the default from happening
     * and then the controlSearch function is called.
     * ? did that before
     */
    e.preventDefault();
    controlSearch();
});

// 这里（MVC中的C）放置event listener; 
// 并且用到了事件代理，因为page load的时候不知道有没有pagination button
// 我们的策略是先attach event listener到一个已经存在的元素上，然后找出click发生的位置
elements.searchResPages.addEventListener('click', e =>{
    // 由于出现被监听的元素太过具体的情况（我们只要button），这里用closest method
    // closest作用的原理是找到离e.target最近的拥有.btn-inline class的父元素，或它本身
    const btn = e.target.closest('.btn-inline');
    if(btn){
        // dataset这个property用来提取html元素中的自定义属性data，提取出来的数据类型是string
        // parseInt里的10是10进制的意思
        const goToPage = parseInt(btn.dataset.goto, 10);
        // 这一步是把先前页面的结果清理掉，这里体现出了separate 功能的好处
        searchView.clearResults();
        
        searchView.renderResults(state.search.result, goToPage);
    }
})

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highight selected search item (还要记得排除那种load但没有search的情况)
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // Get recipe data (这里会停顿等一下) and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(err){
            alert('Error processing recipe!');
        }
    }
}

// load应该是刷新页面时出发的. 这里用到一个技巧，对不同的事件加同一个event listener的操作
// 关键是forEach。如果出现10个事件，就可以这样做
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); 

// Handling recipe button clicks
// 这里提一下，在这次使用事件代理时，我们不能使用closest，因为我们需要分辨出被按的按钮是哪一个
// （+还是-，或者是like button）。所以这里我们使用一种新method，match。
elements.recipe.addEventListener('click', e => {
    // 这里match的用法是选择了btn-decrease这个class，也选择了该class的所有子元素
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        state.recipe.updateServings('dec');
    }else if (e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
    }
});

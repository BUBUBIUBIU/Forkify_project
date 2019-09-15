// export const add = (a,b) => a + b;
// export const multiply = (a, b) => a * b;
// export const ID = 23;

import { elements } from './base';

// 这个function是为了获得输入的query值的
export const getInput = () => elements.searchInput.value;

// 加{}不return？
export const clearInput = () => {elements.searchInput.value = '';};

export const clearResults = () => {elements.searchResList.innerHTML = '';};

/**
 * 这个func的作用是过滤掉字母长度大于17的标题
 * 这里用reduce，其实用foreach也可以，但reduce自带accumulator，方便
 */
const limitRecipeTitle = (title, limit = 17) => {
    // const的array是可以push element的，因为这本质上没有mutate array（没有让variable指向另一个东西）
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length < limit){
                newTitle.push(cur);
            }
            // ？这个应该是用来累加acc的，还需要make sure一下
            return acc + cur.length;
        }, 0);
        // 这个join的功能和split相反，他是把各个element用' '粘合成string
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};

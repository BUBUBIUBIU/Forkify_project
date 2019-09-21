// export const add = (a,b) => a + b;
// export const multiply = (a, b) => a * b;
// export const ID = 23;

import { elements } from './base';

// 这个function是为了获得输入的query值的
export const getInput = () => elements.searchInput.value;

// 加{}不return？
export const clearInput = () => {elements.searchInput.value = '';};

export const clearResults = () => {
    // 清理最左侧的结果
    elements.searchResList.innerHTML = '';
    // 清理之前的button
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    // remove之前被选中的;?ClassList要研究
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    // 这里教你如何选定load之前不存在的CSS class
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
} 

/**
 * 这个func的作用是过滤掉字母长度大于17的标题
 * 这里用reduce，其实用foreach也可以，但reduce自带accumulator，方便
 */
export const limitRecipeTitle = (title, limit = 17) => {
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

    // const getID = (uri) => uri.split('#')[1];
    // const markup = `
    //     <li>
    //         <a class="results__link" href="#${getID(recipe.recipe.uri)}">
    //             <figure class="results__fig">
    //                 <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
    //             </figure>
    //             <div class="results__data">
    //                 <h4 class="results__name">${recipe.recipe.label}</h4>
    //                 <p class="results__author">${recipe.recipe.source}</p>
    //             </div>
    //         </a>
    //     </li>
    // `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// 这个function是直接构造button的function; 直接返回一个string
// type: 'prev' or 'next', ``这种写法让html可编译; 新props data-*; 用来储存各种html中的自定义数据
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// 这个是用来render button的function(主要是layout); 这是一个private function
// 它将计算出总页面，所以需要result的数量以及每个页面所含result的数量
const renderButtons = (page, numResults, resPerPage) => {
    // 根据实际情况，向上取整
    const pages = Math.ceil(numResults / resPerPage);
    // 可变，用let
    let button;

    // 分情况讨论显示button的模式; 注意一点pages总数要大于1，不然没有显示button的意义 
    if(page === 1 && pages > 1){
        // Only button to go to next page
        button = createButton(page, 'next');
    }else if(page < pages){
        // Both buttons 
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }else if(page === pages && pages > 1){
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// 我们要传入除了总菜单以外，还有页码数和每页显示多少项菜品的参数
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    // 这个start指的是每个页面从总菜单提取出来的第一项菜品，end是最后一项
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

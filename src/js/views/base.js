// 把所有对DOM element的操作都放在这里，便于管理
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

export const elementStrings = {
    loader: 'loader',
}

// 这个function是建立一个spinner（就是那个旋转的箭头动画）于parent element中
// parent element可以是search框，result框
export const renderLoader = parent => {
    // ? ""里也能用${};奇特的syntax
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// ?这个function不能用事件代理写吗
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // 神奇的if statement
    if(loader) loader.parentElement.removeChild(loader);
};
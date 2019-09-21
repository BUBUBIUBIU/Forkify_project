import { elements } from "./base";
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // 这个setAttribute就是可以改变被选定的element的props
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // 
}

export const toggleLikeMenu = numLikes => {
    // 一般情况，如果我们想要把很多个不同的style加在一个元素上，我们可能使用class
    // 但是这次，我们只想调整这个元素的一个style（props），所以我们这样做
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    // 注意，在这里，我们不能用 a[href*='${id}'] 来选择元素，因为这样会选到search那边的元素
    const el = document.querySelector(`.likes__link[href*='${id}']`).parentElement;
    if (el) {
        el.parentElement.removeChild(el);
    }
}
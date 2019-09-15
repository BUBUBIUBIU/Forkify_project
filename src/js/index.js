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
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

// 每次reload app后，这个state就会成empty，我们得想办法让某些数据保持persist
const state = {}

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

        // 4) Search for recipe;
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
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

// Starting with default exports, that's the ones that we use
// when we only want to export one thing from a module.
// export default "I am";

import axios from 'axios';  // 一般package name保持和引入的包名一致 
// import { key, proxy, appID } from '../config';

class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        // 这里我们不用fetch function，因为有些老版本的browser识别不了。
        // 我们用axios。axios相比于fetch的优势在于axios return的就是json文件，
        // 而如果我们用fetch的话，还要多一步转换过程
        try{
            // axios会return一个promise，和fetch一样
            // const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`); The food2fork is shutdown
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;

            // const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&from=0&to=50&app_id=${appID}&app_key=${key}`);
            // this.result = res.data.hits;

            // console.log(this.result);
        }catch(error){
            // If we use fetch method, we probably cannot catch the error.
            alert(error);
        }
    }
}

export default Search;

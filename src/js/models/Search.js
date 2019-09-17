// Starting with default exports, that's the ones that we use
// when we only want to export one thing from a module.
// export default "I am";

import axios from 'axios';  // 一般package name保持和引入的包名一致 
import { key, proxy } from '../config'

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
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }catch(error){
            // If we use fetch method, we probably cannot catch the error.
            alert(error);
        }
    }
}

export default Search;

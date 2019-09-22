export default class Likes {
    constructor(){
        // 这里Jonas探讨了一番要不要使用sub class的事情，并举了pizza recipe是普通recipe的一个子部分
        // 但是likes这个情景却很难适用
        this.likes = [];
    }
  
    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in localStorage (这个project我们用不到deleteItem，直接以set的形式覆盖)
        this.persistData();
    }

    // 这个isLiked的作用是用来检查该id是否在like list里，如果不在的话，我们就可以点亮web page中的爱心图案
    // 并且把这个recipe加入like list
    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData() {
        // setItem的value只接受string，这里就把整个likes array转化为string。
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage () {
        // 转化
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }

}
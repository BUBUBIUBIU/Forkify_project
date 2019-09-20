import uniqid from 'uniqid';

export default class List {
    constructor (){
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            // 这里用到一个专门产生unique id的包，从github上挖来的
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        // [2, 4, 8] splice(1, 2) -> return [4, 8], original array is [2]
        // [2, 4, 8] slice(1, 2) -> return [4], original array is [2, 4, 8]
        // 这里讲述了slice和splice的区别, splice的第二个参数是去掉多少个元素的意思
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}
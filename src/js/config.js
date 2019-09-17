// 用config file方便管理这些key和proxy，不用到处改
// 但是这里提醒一点，这些数据不应该被传送给客户端，这样会暴露自己的key，api等重要信息（这个例子这样做OK）
export const key = '5c624ed4228f3feb53d0ebc5f249c30b';
export const proxy = 'https://cors-anywhere.herokuapp.com/';
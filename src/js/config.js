// 用config file方便管理这些key和proxy，不用到处改
// 但是这里提醒一点，这些数据不应该被传送给客户端，这样会暴露自己的key，api等重要信息（这个例子这样做OK）

// These are proxy and key for food2fork
export const key = '5c624ed4228f3feb53d0ebc5f249c30b';
export const proxy = 'https://cors-anywhere.herokuapp.com/';

// These are appID and key for EDAMAN
// export const key = 'b5e54290b9ad12e48efbf185ad0b5fb4';
export const appID = '1fd8617e';
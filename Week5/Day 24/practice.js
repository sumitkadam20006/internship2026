// Q1
// function createCounter(n) {
//     return function () {
//         return n++;
//     };
// }
// const counter = createCounter(1);
// for (let i = 0; i < 5; i++) {
// console.log(counter()); 
// }

// Q2

var filter = function(arr, func) {
    let result = [];
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        if (func(arr[i], i)) {
            result.push(arr[i]);
        }
    }

    return result;
};
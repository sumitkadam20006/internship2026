const colors = ["Red", "Green", "Blue"];

const first = colors[0];
const second = colors[1];

const [first, second, third] = colors;
console.log(first, second, third);

const [, , onlyThird] = colors;
console.log(onlyThird);

let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);
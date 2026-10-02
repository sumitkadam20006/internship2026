// Q1
function calculateArea(length,width) {
    const result = length * width;
    return result;
}
const area =calculateArea(5,4);
console.log(`Area Of Rectangle: ${area}`);

// Q2
const calculateAreaArrow = (length, width) => length * width;
console.log(calculateAreaArrow(5, 4));

// Q3
function convertCelsiusToFahrenheit(celsius) {
    const temp = (celsius * 9/5) + 32;
    return temp;
}
const temp1 = convertCelsiusToFahrenheit(30);
console.log(`Converted Temp: ${temp1}`);

// Q4
function calculateEMI(principal, rate, months) {
    const installment =
        (principal + (principal * rate * months / 1200)) / months;
        return installment.toFixed(2);
}
console.log(`"${calculateEMI(100000, 10, 12)}"`);

// Q5
const sumAll = (...nums) => nums.reduce((acc, curr) => acc + curr, 0);
console.log(sumAll(2, 4, 6, 8));


// Q6
// PURE
function applyDiscount(price, percent) {
    return price - (price * percent) / 100;
}
// IMPURE
let externalTotal = 1000;
function applyDiscountImpure(percent) {
    externalTotal = externalTotal - (externalTotal * percent) / 100;
    return externalTotal;
}
console.log("Pure:", applyDiscount(1000, 20));


// Q7
const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
console.log(colors[0]);              
console.log(colors[2]);                   
console.log(colors[colors.length - 1]);   


// Q8.
function addToCart(cart, item) {
    cart.push(item);
    return cart.length;
}
console.log(addToCart(["Pen", "Book"], "Eraser"));


// Q9
const temps = [28, 32, 35, 29, 31];
const hotDays = temps.filter(temp => temp > 30);
console.log(hotDays);


// Q10
const products = ["pen", "book", "bag"];
const upperProducts = products.map(product => product.toUpperCase());
console.log(upperProducts);


// Q11
const items = ["A", "B", "C", "D"];
items.splice(2, 1, "X", "Y"); 
console.log(items);

// Q12
const students = ["Alex", "Ben", "Charlie", "David", "Emma", "Frank", "Grace"];
const lastThree = students.slice(-3);
console.log("Extracted:", lastThree);
console.log("Original Unchanged:", students);


// Q13
const orders = [
    { id: 101, amount: 250, status: "delivered" },
    { id: 102, amount: 400, status: "pending" },
    { id: 103, amount: 150, status: "delivered" },
    { id: 104, amount: 600, status: "shipped" }
];
const deliveredOrderIds = orders
    .filter(order => order.status === "delivered")
    .map(order => order.id);
console.log(deliveredOrderIds);


// Q14
function calculateCartTotal(cartItems) {
    return cartItems
        .map(item => item.price * item.qty)
        .reduce((acc, curr) => acc + curr, 0);
}
console.log(calculateCartTotal([{price: 100, qty: 2}, {price: 50, qty: 3}])); // Expected: 350


// Q15
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(removeDuplicates([1, 2, 2, 3, 1, 4]));


// Q16
function processInventory(inventoryList) {
    const processed = inventoryList
        .filter(product => product.stock > 0)
        .map(product => ({
            ...product,
            totalValue: product.price * product.stock
        }));

    const grandTotal = processed.reduce((acc, curr) => acc + curr.totalValue, 0);
    console.log("Grand Total Inventory Value:", grandTotal);
    return processed;
}
const sampleInventory = [
    { name: "Laptop", price: 1000, stock: 5 },
    { name: "Mouse", price: 25, stock: 0 },
    { name: "Monitor", price: 200, stock: 2 }
];
processInventory(sampleInventory);
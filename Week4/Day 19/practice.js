// Q1
const book = {
    title: "ABC",
    author: "XYZ",
    price: 199
};

console.log(book.title);
console.log(book.author);
console.log(book.price);

// Q2
const book2 = {
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,

    getSummary() {
        return `${this.title} by ${this.author}`;
    }
};

console.log(book2.getSummary());

// Q3
const person = {
    "full name": "Atharv Pote"
};

console.log(person["full name"]);

// Q4
function getProperty(obj, key) {
    return obj[key];
}

const Abook = {
    title: "Atomic Habits",
    author: "James Clear",
    price: 499
};

console.log(getProperty(Abook, "title"));
console.log(getProperty(Abook, "author"));
console.log(getProperty(Abook, "price"));

// Q5
const student = {
    name: "Atharv",
    address: {
        city: "Pune",
        state: "Maharashtra"
    }
};

console.log(student.address.city);
console.log(student["address"]["city"]);

// Q6
const product = {
    name: "Laptop",
    price: 55000
};

const productJSON = JSON.stringify(product);

console.log(productJSON);
console.log(typeof productJSON);

// Q7
const rawJSON = '{"name":"Arjun","age":21}';
const user = JSON.parse(rawJSON);

console.log(user.name);

// Q8
function mergeStudentUpdates(original, updates) {
    return {
        ...original ,
        ...updates
    };
}

const inputOriginal = { name: "Atharv",batch: 2026, skills:["HTML","CSS"]};
const inputUpdates = mergeStudentUpdates(inputOriginal, inputUpdates);
console.log(mergedStudent);
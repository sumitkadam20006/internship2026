for (let i = 0; i < 5;i++) {
    console.log(`Iteration ${i}`);
}

function printTable(num){
    for(let i = 1; i<=10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}
printTable(7);

let balance = 5000;
const withdrawAmount = 1500;

while(balance >= withdrawAmount) {
    balance -= withdrawAmount;
    console.log(`Withdraw $${withdrawAmount}. Remaining: $${balance}`);
}
console.log(`Final balance too low to withdraw $${withdrawAmount} again: $${balance}`);

let attempts = 0;
let connected = false;

do {
    attempts++;

    console.log(`Attempt #${attempts} to connect to server`);

    if (attempts === 4) {
        connected = true;
    }

} while (!connected);

console.log("Connected successfully!");
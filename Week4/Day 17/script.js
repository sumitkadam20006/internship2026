let cartTotal = 0;
const itemPrice = 499;
const quantity = 3;
const gstrate = 0.18;

cartTotal += itemPrice * quantity;
const gstAmount = cartTotal * gstrate;
const finalTotal = cartTotal + gstAmount;

console.log(`Cart Total: $${cartTotal},\nGST: $${gstAmount.toFixed(2)},\nFinal: $${finalTotal.toFixed(2)}`);
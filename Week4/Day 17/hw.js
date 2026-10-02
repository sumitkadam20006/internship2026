// Q4
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) {
        console.log(i);
    }
}

// Q5
function getSeason(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "Winter";
        case 3:
        case 4:
        case 5:
            return "Summer";
        case 6:
        case 7:
        case 8:
        case 9:
            return "Monsoon";
        case 10:
        case 11:
            return "Autumn";
        default:
            return "Invalid month";
    }
}
console.log(getSeason(7)); 


// Q6
function sumOfDigits(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}
console.log(sumOfDigits(1234)); 


// Q7
function isPalindrome(str) {
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
console.log(isPalindrome("madam")); 


// Q8
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; 
        }
    }
    return true;
}
console.log(isPrime(17)); 


// Q9
const prices = [50, 150, 80, 300, 99, 500];
for (const price of prices) {
    if (price < 100) {
        continue;
    }
    console.log(price);
}


// Q10
function calculateBMICategory(weight, height) {
    const bmi = weight / (height * height);
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obese";
}
console.log(calculateBMICategory(70, 1.75)); 


// Q11
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}
fizzBuzz(15);


// Q12
function printPattern(n) {
    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        console.log(row);
    }
}
printPattern(4);


// Q13
function calculateElectricityBill(units) {
    let bill = 0;
    if (units <= 100) {
        bill = units * 3;
    } else if (units <= 200) {
        bill = (100 * 3) + ((units - 100) * 5);
    } else {
        bill = (100 * 3) + (100 * 5) + ((units - 200) * 8);
    }
    return bill;
}
console.log(calculateElectricityBill(250));


// Q14
function findSecondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if (arr[i] > secondLargest && arr[i] !== largest) {
            secondLargest = arr[i];
        }
    }
    return secondLargest;
}
console.log(findSecondLargest([18, 45, 22, 90, 33])); 
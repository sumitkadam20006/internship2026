// Q4 (MEDIUM)
console.log("------------------------");

function describeStudent({ name, batch = 2026 }) {
    return `Student ${name} belongs to batch ${batch}.`;
}

console.log(describeStudent({ name: "Arjun" }));
console.log(describeStudent({ name: "Atharv", batch: 2027 })); 


// Q5 (MEDIUM)
console.log("------------------------");
const complexUserData = {
    user: {
        profile: {
            bio: "Full Stack Web Developer & Designer"
        }
    }
};

const { user: { profile: { bio } } } = complexUserData;

console.log("Extructured Bio:", bio); 


// Q6 (MEDIUM)
console.log("------------------------");
function average(...nums) {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
}

console.log("Calculated Average:", average(4, 8, 12)); 
console.log("Calculated Average (Empty):", average()); 

// Q7 (Medium)
console.log("------------------------");
const userProfile = {
    name: "Atharv Pote",
    email: "atharvpote14@gmail.com",
    age: 18,
    city: "Pune"
};

const { email, ...otherInfo} = userProfile;
console.log("Extracted Email:" ,email);
console.log("otherInfo :", otherInfo);

// Q8 (Hard)
console.log("------------------------");

function mergeSettings(defaults, overrides) {
    return{...defaults, ...overrides};
}

const defaultConfigs = {theme: "light", notification: true};
const userOverrides = {theme: "dark", sidebar: "collapsed"};

const finalSettings = mergeSettings(defaultConfigs, userOverrides);
console.log("Merged Settings Config: ", finalSettings);
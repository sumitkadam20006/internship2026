const user = { name: "Atharv"};
const {name, role = "Student"} = user;
console.log(role);
const {name: studentName} = user;
console.log(studentName);
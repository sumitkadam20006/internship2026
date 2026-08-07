const API = "http://localhost:3000";

async function registerUser() {

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch(API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

});

const data = await res.json();

document.getElementById("result").textContent =
JSON.stringify(data,null,2);

}

async function loginUser(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const res=await fetch(API+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data=await res.json();

if(data.token){

document.getElementById("token").value=data.token;

}

document.getElementById("result").textContent=
JSON.stringify(data,null,2);

}

async function profile(){

const token=document.getElementById("token").value;

const res=await fetch(API+"/profile",{

headers:{
Authorization:"Bearer "+token
}

});

const data=await res.json();

document.getElementById("result").textContent=
JSON.stringify(data,null,2);

}
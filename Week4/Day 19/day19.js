const title = document.getElementById("page-title");

const infoText = document.querySelector(".info-text");
const firstButton = document.querySelector("button"); 
const byId = document.querySelector("#page-title");   

const allButtons = document.querySelectorAll(".btn-primary");

allButtons.forEach((btn) => console.log(btn.textContent));

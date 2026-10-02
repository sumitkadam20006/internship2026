const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

button.onclick = function () {

    let li = document.createElement("li");

    li.textContent = input.value;

    let deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";
};

import { useState } from "react";
import "./Todo.css";

function Todo() {

    const [task, setTask] = useState("");

    const [tasks, setTasks] = useState([]);

    function addTask() {

        if (task.trim() === "") {
            return;
        }

        if (tasks.includes(task)) {
            alert("Task already exists!");
            return;
        }

        setTasks([...tasks, task]);

        setTask("");

    }

    return (

        <div className="todo">

            <h2>To-Do List</h2>

            <input

                type="text"

                value={task}

                placeholder="Enter Task"

                onChange={(e)=>setTask(e.target.value)}

            />

            <button

                onClick={addTask}

                disabled={task.trim()===""}

            >

                Add Task

            </button>

            <h3>Total Tasks : {tasks.length}</h3>

            <ul>

                {

                    tasks.map((item,index)=>

                        <li key={index}>{item}</li>

                    )

                }

            </ul>

        </div>

    );

}

export default Todo;
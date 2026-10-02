import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

function TodoApp() {

    const {

        todos,

        addTodo,

        toggleTodo,

        deleteTodo

    } = useTodos();

    const [text, setText] = useState("");

    const [filter, setFilter] = useState("all");

    function handleSubmit(e) {

        e.preventDefault();

        if (!text.trim()) return;

        addTodo(text.trim());

        setText("");

    }

    const visibleTodos = todos.filter((todo) => {

        if (filter === "active") {

            return !todo.completed;

        }

        if (filter === "completed") {

            return todo.completed;

        }

        return true;

    });

    return (

        <div className="todo-container">

            <h1>React Todo App</h1>

            <form
                className="todo-form"
                onSubmit={handleSubmit}
            >

                <input

                    type="text"

                    placeholder="Add a new task..."

                    value={text}

                    onChange={(e) =>

                        setText(e.target.value)

                    }

                />

                <button type="submit">

                    Add

                </button>

            </form>

            <div className="filters">

                {

                    ["all", "active", "completed"].map((item) => (

                        <button

                            key={item}

                            onClick={() => setFilter(item)}

                            disabled={filter === item}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

            <ul className="todo-list">

                {

                    visibleTodos.map((todo) => (

                        <li

                            key={todo.id}

                            className="todo-item"

                        >

                            <input

                                type="checkbox"

                                checked={todo.completed}

                                onChange={() =>

                                    toggleTodo(todo.id)

                                }

                            />

                            <span

                                className={

                                    todo.completed

                                        ? "completed"

                                        : ""

                                }

                            >

                                {todo.text}

                            </span>

                            <button

                                className="delete-btn"

                                onClick={() =>

                                    deleteTodo(todo.id)

                                }

                            >

                                Delete

                            </button>

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default TodoApp;
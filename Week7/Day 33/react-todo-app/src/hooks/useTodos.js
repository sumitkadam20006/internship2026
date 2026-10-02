import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {

    const [todos, setTodos] = useLocalStorage("todos", []);

    // Add Todo
    function addTodo(text) {

        const newTodo = {

            id: Date.now(),

            text: text,

            completed: false

        };

        setTodos((prevTodos) => [

            ...prevTodos,

            newTodo

        ]);

    }

    // Toggle Completed
    function toggleTodo(id) {

        setTodos((prevTodos) =>

            prevTodos.map((todo) =>

                todo.id === id

                    ? {

                        ...todo,

                        completed: !todo.completed

                    }

                    : todo

            )

        );

    }

    // Delete Todo
    function deleteTodo(id) {

        setTodos((prevTodos) =>

            prevTodos.filter((todo) =>

                todo.id !== id

            )

        );

    }

    return {

        todos,

        addTodo,

        toggleTodo,

        deleteTodo

    };

}
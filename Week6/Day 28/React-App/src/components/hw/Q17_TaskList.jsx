// Q17: Task list with add button (never mutate state directly)
import { useState } from "react";

function Q17_TaskList() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    // Create a new array (never mutate state directly)
    setTasks([...tasks, `Task ${tasks.length + 1}`]);
  };

  return (
    <div>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Q17_TaskList;

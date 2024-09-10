import React from "react";
import "./App.css";

let nextId = 0;

type Task = {
  id: number;
  task: string;
  isChecked: boolean;
};

function App() {
  const [task, setTask] = React.useState("");
  const [allTasks, setAllTasks] = React.useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = React.useState<Task[]>([]);

  const addTask = () => {
    setTask("");

    setAllTasks([
      {
        id: nextId++,
        task,
        isChecked: false,
      },
      ...allTasks,
    ]);
  };

  const markAsDone = (id: number) => {
    const unMarked = allTasks.filter((item) => {
      if (item.id == id) {
        setDoneTasks([
          ...doneTasks,
          {
            id: item.id,
            task: item.task,
            isChecked: true,
          },
        ]);
      }
      return item.id !== id;
    });

    setAllTasks(unMarked);
  };

  return (
    <div className="container">
      <div className="add-task-wrapper">
        <input
          placeholder="your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            addTask();
          }}
        >
          Add task
        </button>
      </div>

      <div className="task-wrapper">
        <div className="task-not-checked">
          <h4>My tasks</h4>
          {allTasks.map(
            (task) =>
              !task.isChecked && (
                <li key={task.id}>
                  <input type="checkbox" onChange={() => markAsDone(task.id)} />
                  <p>{task.task}</p>
                </li>
              )
          )}
        </div>

        <div className="task-checked">
          <h4>Done</h4>
          {doneTasks.map(
            (task) => task.isChecked && <p key={task.id}>{task.task}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

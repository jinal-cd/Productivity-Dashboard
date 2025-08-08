import { useReducer, useRef, useMemo, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TaskItem from "./TaskItem";

const ACTIONS = {
  ADD: "add-task",
  TOGGLE: "toggle-task",
  DELETE: "delete-task",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case ACTIONS.TOGGLE:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case ACTIONS.DELETE:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TaskList() {
  // Persist state with localStorage
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [tasks, dispatch] = useReducer(reducer, storedTasks);
  const [search, setSearch] = useState("");
  const inputRef = useRef();

  // Keep localStorage updated when tasks change
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    dispatch({ type: ACTIONS.ADD, payload: inputRef.current.value });
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Tasks</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add
        </button>
      </form>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-3 border rounded"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() =>
                dispatch({ type: ACTIONS.TOGGLE, payload: task.id })
              }
              onDelete={() =>
                dispatch({ type: ACTIONS.DELETE, payload: task.id })
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

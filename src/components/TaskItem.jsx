export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`flex justify-between items-center p-2 rounded ${
        task.completed ? "bg-green-100 line-through" : "bg-gray-100"
      }`}
    >
      <span onClick={onToggle} className="cursor-pointer flex-1">
        {task.text}
      </span>
      <button
        onClick={onDelete}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        ❌
      </button>
    </li>
  );
}

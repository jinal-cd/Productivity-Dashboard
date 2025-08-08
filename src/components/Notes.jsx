import { useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [text, setText] = useState("");
  const inputRef = useRef();

  const addNote = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const newNote = { id: Date.now(), text };
    setNotes([...notes, newNote]);
    setText("");
    inputRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Notes</h2>

      <form onSubmit={addNote} className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Add
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              <span>{note.text}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

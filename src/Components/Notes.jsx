import React, { useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";

const SecureNotesEditor = ({ masterKey }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editorRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedEncrypted =
      JSON.parse(localStorage.getItem("secureNotes")) || [];
    const decryptedNotes = savedEncrypted
      .map((note) => {
        try {
          const decrypted = CryptoJS.AES.decrypt(note.data, masterKey).toString(
            CryptoJS.enc.Utf8
          );
          return { ...note, content: decrypted };
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    setNotes(decryptedNotes);
  }, [masterKey]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    const encryptedNotes = notes.map((note) => {
      const data = CryptoJS.AES.encrypt(note.content, masterKey).toString();
      return { ...note, data };
    });
    localStorage.setItem("secureNotes", JSON.stringify(encryptedNotes));
  }, [notes, masterKey]);

  const handleTextInput = (e) => {
    setContent(e.target.innerText);
  };

  const handleSaveNote = () => {
    if (!title) return alert("Enter note title");
    const note = currentNote
      ? { ...currentNote, title, content }
      : { id: Date.now().toString(), title, content };
    const updatedNotes = currentNote
      ? notes.map((n) => (n.id === currentNote.id ? note : n))
      : [note, ...notes];
    setNotes(updatedNotes);
    clearEditor();
  };

  const clearEditor = () => {
    setTitle("");
    setContent("");
    setCurrentNote(null);
    if (editorRef.current) editorRef.current.innerText = "";
  };

  const handleSelectNote = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    if (editorRef.current) editorRef.current.innerText = note.content;
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (currentNote?.id === id) clearEditor();
  };

  return (
    <div className="flex h-[90vh] w-full bg-gray-900 text-white overflow-hidden">
      <div className="flex flex-col p-6 gap-4" style={{ width: "70%" }}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600 text-lg font-semibold"
        />

        <div
          contentEditable
          ref={editorRef}
          className="flex-1 p-4 bg-gray-800 rounded overflow-auto"
          style={{ whiteSpace: "pre-wrap", minHeight: "0" }}
          onInput={handleTextInput}
        ></div>

        <div className="flex gap-2">
          <button
            onClick={handleSaveNote}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Save Note
          </button>
          <button
            onClick={clearEditor}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Right sidebar - 30% */}
      <div
        className="p-4 border-l border-gray-700 overflow-y-auto h-full"
        style={{ width: "30%" }}
      >
        <h2 className="text-2xl font-bold mb-4">Saved Notes</h2>
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-2 mb-2 border rounded bg-gray-800 flex justify-between items-center cursor-pointer hover:bg-gray-700"
            onClick={() => handleSelectNote(note)}
          >
            <span className="truncate">{note.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note.id);
              }}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecureNotesEditor;

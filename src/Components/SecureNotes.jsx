import React, { useState } from "react";
import { errorAlert } from "../utils/Alerts";
import Note from "./Notes";

const SecureNotes = () => {
  const [masterKey, setMasterKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const cred = "admin";

  const unlockNotes = () => {
    if (!masterKey) return errorAlert("Enter master key");
    if (masterKey === cred) {
      setIsUnlocked(true);
    } else {
      console.log("here!!!!", masterKey);
      errorAlert("Please enter the correct key!");
      console.log("here!!!!", masterKey);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">📝 Secure Notes</h2>
      {isUnlocked && <Note masterKey={masterKey} />}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">🔑 Enter Master Key</h3>
            <input
              type="password"
              placeholder="Master key"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  unlockNotes();
                }
              }}
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-black/40 text-white placeholder-gray-400 border border-gray-600"
            />
            <button
              onClick={unlockNotes}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Unlock Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecureNotes;

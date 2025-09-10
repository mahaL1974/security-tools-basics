import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordStrength from "./Components/Login";
import SecureNotes from "./Components/SecureNotes";
import { AlertContainer } from "./utils/Alerts";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AlertContainer />
        <Routes>
          <Route path="/" element={<PasswordStrength />} />
          <Route path="/secure-notes" element={<SecureNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

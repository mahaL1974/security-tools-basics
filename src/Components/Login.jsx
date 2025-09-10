import React, { useState } from "react";
import { Lock, User, CheckCircle, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../utils/Alerts";

const CyberAuthBlock = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const cred = { username: "admin", password: "Admin@123" };

  const navigate = useNavigate();

  const requirements = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /[0-9]/, label: "One number" },
    { regex: /[^A-Za-z0-9]/, label: "One special character" },
  ];

  const checkStrength = (pwd) =>
    requirements.reduce(
      (score, req) => score + (req.regex.test(pwd) ? 1 : 0),
      0
    );

  const strength = checkStrength(password);

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
      case 1:
        return { label: "Weak", color: "bg-red-500", text: "text-red-400" };
      case 2:
        return {
          label: "Moderate",
          color: "bg-yellow-500",
          text: "text-yellow-400",
        };
      case 3:
      case 4:
        return {
          label: "Strong",
          color: "bg-green-500",
          text: "text-green-400",
        };
      default:
        return { label: "", color: "bg-gray-500", text: "text-gray-400" };
    }
  };

  const { label, color, text } = getStrengthLabel();

  const handleAuth = () => {
    if (
      username === cred?.username &&
      strength >= 3 &&
      password === cred?.password
    ) {
      setAuthMessage("✅ Access Granted");
      successAlert("✅ Access Granted");

      setTimeout(() => {
        navigate("/secure-notes");
      }, 1200);
    } else {
      setAuthMessage("❌ Access Denied");
      errorAlert("❌ Access Denied");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue bg-center relative">
      {/* Overlay for hacker vibe */}
      <div className="absolute inset-0 bg-[#152238] backdrop-blur-sm "></div>

      {/* Floating glass block */}
      <div className="relative z-10 w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.3)] p-8 text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 tracking-widest">
          CYBER AUTH
        </h1>

        {/* Username */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAuth();
              }
            }}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <User className="absolute left-3 top-3 text-cyan-300" size={20} />
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAuth();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <Lock className="absolute left-3 top-3 text-cyan-300" size={20} />
        </div>

        {/* Strength meter */}
        {password && (
          <div className="mb-5">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${color}`}
                style={{
                  width:
                    strength <= 1 ? "33%" : strength === 2 ? "66%" : "100%",
                }}
              ></div>
            </div>
            <p
              className={`mt-2 font-semibold flex items-center justify-center gap-2 ${text}`}
            >
              {strength <= 1 ? (
                <ShieldAlert size={18} />
              ) : strength === 2 ? (
                <ShieldAlert size={18} className="text-yellow-400" />
              ) : (
                <CheckCircle size={18} />
              )}
              {label}
            </p>
          </div>
        )}

        {/* Authenticate button */}
        <button
          onClick={handleAuth}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg shadow-lg shadow-cyan-400/50 transition-all duration-300"
        >
          Authenticate
        </button>

        {/* Result */}
        {authMessage && (
          <p className="mt-4 text-lg font-semibold text-cyan-300">
            {authMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default CyberAuthBlock;

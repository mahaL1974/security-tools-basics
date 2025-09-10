import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000} 
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      draggable
      pauseOnHover
      theme="dark"
      closeButton={true} 
      toastClassName="rounded-xl bg-gray-900 border border-cyan-400/40 shadow-lg shadow-cyan-500/20 text-cyan-100 font-mono"
      bodyClassName="text-sm tracking-wide"
      progressClassName="h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
    />
  );
};

export const errorAlert = (msg) => {
  toast.error(msg, {
    className:
      "border-l-4 border-red-500 bg-red-900/30 text-red-300 backdrop-blur-md",
  });
};

export const successAlert = (msg) => {
  toast.success(msg, {
    className:
      "border-l-4 border-green-500 bg-green-900/30 text-green-300 backdrop-blur-md",
  });
};

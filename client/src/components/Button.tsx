import React from "react";

interface ButtonProps {
  bg: string;
  text: string;
  color: string;
  isLoading?: boolean; // Optional prop for the loading state
}

const Button: React.FC<ButtonProps> = ({ bg, text, color, isLoading }) => {
  return (
    <button
      style={{ backgroundColor: bg, color }}
      className={`flex items-center justify-center w-full p-2 rounded-md ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={isLoading} // Disable the button while loading
    >
      {isLoading ? (
        <div className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;

import React from "react";
import "./loader.css"; // Import the custom keyframes for animations

const TypingIndicator = () => {
  return (
    <div className="relative w-16 h-8 z-4 flex items-center justify-center">
      <div className="typing-circle"></div>
      <div className="typing-circle delay-200"></div>
      <div className="typing-circle delay-300"></div>
      <div className="typing-shadow"></div>
      <div className="typing-shadow delay-200"></div>
      <div className="typing-shadow delay-300"></div>
    </div>
  );
};

export default TypingIndicator;

import React, { useState } from "react";
import Shiba from "../assets/shiba.png";
import { createJournal } from "../api/api.js";

const TextAreaInput = ({ onResponse, onSubmit, loading, setLoading }) => {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(text);
    
    if (!text.trim() || text.length < 20) {
      setWarning("Please enter atleast 20 characters");
      return;
    }

    // Pass the entered text to HomePage
    onSubmit(text);

    setLoading(true);
    try {
      // Simulate an API response
      const data = await createJournal(text);
      // console.log(data);
      
      onResponse(data);
      setText(""); // Clear the textarea
        setLoading(false); // Stop loading after response
      // setTimeout(() => {
      // }, 3000);
    } catch (error) {
      console.error("Error submitting text:", error);
      setLoading(false); // Stop loading if there is an error
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
      // Perform desired action
    }
  };


  return (
    <div className="flex flex-col items-center w-full lg:p-0">
      {/* Show TypingIndicator during loading */}
      {!loading && (
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start my-4 py-4 pl-4 lg:p-0">
            <h2 className="text-white font-medium text-xl lg:font-semibold lg:text-2xl mb-2">
              No one to share your thoughts with?
            </h2>
            <h3 className="text-white font-normal text-lg lg:font-medium lg:text-xl">
              Shiba's all ears! Tell me about your day—I'm here for you.
            </h3>
            <h5 className="text-gray-200 font-normal text-sm lg:font-medium lg:text-md mb-3">
              {formattedDate}
            </h5>
            <p className=" text-gray-300">Please be accurate because you can only submit one journal entry per day.</p>
          </div>
          <div className="relative p-2 lg:p-0 lg:pt-4 w-full  ">
            <img
              src={Shiba}
              alt=""
              className=" w-28 right-[30px] top-[-78px] lg:w-48 absolute lg:top-[-125px] lg:right-0 z-0"
            />
            <textarea
              rows="4"
              className="z-10 relative block  p-2.5 w-full h-64 lg:w-[760px] text-lg mb-4 text-white bg-primary rounded-lg"
              placeholder="Write your day here..."
              style={{ resize: "none" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            {warning && <p className=" text-red-600 mb-2">{warning}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full lg:w-[760px] p-3 rounded-full text-lg font-semibold tracking-wider ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-primary-dark hover:bg-gray-300"
              }`}
            >
              {loading ? "Submitting..." : "Tell to Shiba..."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;

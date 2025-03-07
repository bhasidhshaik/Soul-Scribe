import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import TextAreaInput from "../components/TextAreaInput";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TypingIndicator from "../components/loader/TypingIndicator";
import ShibaHappy from "../assets/happy.png";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { user } = useUser();
  const [submittedText, setSubmittedText] = useState(""); // State to store trimmed user text
  const [showFullText, setShowFullText] = useState(false); // Toggle to show/hide full text
  const [response, setResponse] = useState(""); // State to store the server response
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const fallbackImage = "https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"; // Replace with your fallback image
  const [userPicture, setUserPicture] = useState(fallbackImage);
  const [loadingImage, setLoadingImage] = useState(true); // Track if the image is loading
const handleHistory = ()=>{
navigate('/history')
}
 
  useEffect(() => {
    // Check localStorage for any previous data and load it
    const storedResponse = localStorage.getItem("journalResponse");
    const storedText = localStorage.getItem("submittedText");
    const storedDate = localStorage.getItem("storedDate");
    const currentDate = new Date().toISOString().split("T")[0]; 


if (storedDate !== currentDate) {
  // Clear localStorage if it's a new day
  localStorage.removeItem("submittedText");
  localStorage.removeItem("journalResponse");
  localStorage.setItem("storedDate", currentDate); // Update the stored date here
  location.reload()
}
    
    if (storedResponse) {
      setResponse(storedResponse); // Set the response from localStorage
    }

    if (storedText) {
      setSubmittedText(storedText); // Set the submitted text from localStorage
    }

    if (user?.picture) {
      const cachedImage = localStorage.getItem("userImage");

      if (cachedImage !== user.picture) {
        localStorage.setItem("userImage", user.picture);
        setUserPicture(user.picture);
      } else {
        setUserPicture(cachedImage); // Use cached image if available
      }
    }
    // localStorage.setItem("storedDate", currentDate);
  }, [user]);

  const handleImageError = (event) => {
    if (event.target.src !== fallbackImage) {
      setUserPicture(fallbackImage);
    }
  };

  const handleImageLoad = () => {
    setLoadingImage(false); // Image successfully loaded
  };

  const handleTextSubmit = (text) => {
    setSubmittedText(text);
    localStorage.setItem("submittedText", text); // Save submitted text in localStorage
    setShowFullText(false); // Initially show trimmed version
  };

  const handleResponse = (data) => {
    setResponse(data.data.journal.feedback);
    localStorage.setItem("journalResponse", data.data.journal.feedback); // Save response in localStorage
  };

  const handleCreateNewEntry = () => {
    setSubmittedText(""); // Clear text
    setResponse(""); // Clear response
    localStorage.removeItem("submittedText"); // Clear localStorage
    localStorage.removeItem("journalResponse");
  };

  const isResponseIsApolozy = response === 'Apologies from Shiba: You can only submit one journal entry per day. But don’t worry, Shiba will be here waiting for you! Please come back tomorrow and share your thoughts with me then.'

  return (
    <>

      <div className="pb-4 bg-primary-dark lg:p-52 lg:pt-4 min-h-screen">
        {!response && (
          <TextAreaInput
            onResponse={handleResponse}
            onSubmit={handleTextSubmit}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {submittedText && (
          <div className="p-4 lg:mt-8 lg:px-4 text-white sm:mt-0 ">
            <div className="flex items-center gap-x-2 mb-2 lg:mb-4">
              <img
                src={userPicture}
                alt={user?.name || "User"}
                onError={handleImageError}
                onLoad={handleImageLoad}
                className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                loading="lazy"
              />
              <h3 className="lg:text-2xl font-medium text-gray-100 sm:text-xl">
                {user.name} <span className="text-gray-300">says</span>:
              </h3>
            </div>
            <p className="text-lg lg:text-xl">
              {showFullText
                ? submittedText
                : `${submittedText.slice(0, 100)}...`}{" "}
              {submittedText.length > 100 && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-blue-400 ml-2"
                >
                  {showFullText ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        )}

        {loading && (
          <div className="flex gap-x-4 my-4 pl-4">
            <p className="text-gray-200 font-light">Shiba is typing</p>
            <TypingIndicator />
          </div>
        )}

        {response && (
          <div className="mt-2 lg:mt-8 px-4 text-white">
            <div className="flex items-center gap-x-2 mb-4">
              <img
                src={ShibaHappy}
                alt={"Shiba"}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
                loading="lazy"
              />
              <h3 className="lg:text-2xl font-medium text-gray-300">
               Shiba says:
              </h3>
            </div>
            <p className="mt-4 text-lg lg:text-xl font-light leading-7 ">{response}</p>
          </div>
        )}

{(isResponseIsApolozy && response) && (
  <div className="mt-6 text-center">
    <button
      onClick={handleHistory}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg"
    >
      See your journal history
    </button>
  </div>
)}

{(response && !isResponseIsApolozy) && (
  <div className="mt-6 text-center">
    <button
      onClick={handleCreateNewEntry}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg"
    >
      Create New Entry
    </button>
  </div>
)}

      </div>
      </>
  );
};

export default HomePage;

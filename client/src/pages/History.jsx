import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { getJournals } from '../api/api'
import { useUser } from '../context/UserContext'
import ShibaHappy from "../assets/happy.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { IoCloseOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import NotFound from '../assets/not.png'
import InfinityLoader from '../components/loader/InfinityLoader';

const History = () => {
  const {user} = useUser()
  const [isCalenderOpen , setIscalenderOpen] = useState(false)
  const [journalHistory , setJournalHistory] = useState([])
  const [isPageLoading, setIsPageLoading] = useState(true)
      const [selected , setSelected] = useState()
      // console.log(selected.toLocaleDateString()); //Output is 12/21/2024
  
    const fallbackImage = "https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"; // Replace with your fallback image
    const [userPicture, setUserPicture] = useState(fallbackImage);
      const [loadingImage, setLoadingImage] = useState(true); // Track if the image is loading
      const calendarRef = useRef(null); 
  useEffect(()=>{
const getAllJournals = async()=>{
  try {
    setIsPageLoading(true)
    
    const journals = await getJournals();
    setJournalHistory(journals.data)
    setIsPageLoading(false)
    
  } catch (error) {
    console.log("Error while calling getJournal functuon");
  }
}
getAllJournals();

if (user?.picture) {
  const cachedImage = localStorage.getItem("userImage");

  if (cachedImage !== user.picture) {
    localStorage.setItem("userImage", user.picture);
    setUserPicture(user.picture);
  } else {
    setUserPicture(cachedImage); // Use cached image if available
  }
}

  },[])
  const handleImageError = (event) => {
    if (event.target.src !== fallbackImage) {
      setUserPicture(fallbackImage);
    }
  };

  const handleImageLoad = () => {
    setLoadingImage(false); // Image successfully loaded
  };
// console.log(journalHistory);

const convertDate = (date) => {
  if (!date) return 'Invalid Date'; // Handle cases where the date is undefined or null
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date)); // Ensure date is a Date object
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
};

const filteredJournalHistory = selected
    ? journalHistory.filter(
        (chat) =>
          new Date(chat.createdAt).toLocaleDateString() ===
          selected.toLocaleDateString()
      )
    : journalHistory;


    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIscalenderOpen(false); // Close the calendar
        
      }
    };
  
    useEffect(() => {
      if (isCalenderOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isCalenderOpen]);

    if(isPageLoading){
      return <div> <InfinityLoader /> </div>
    }

  return (
    <div className=' '>
     {!isCalenderOpen && (
      <div className=' pl-4 pt-4'>
        <span className=' border border-black p-2 rounded-full flex max-w-fit items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all' onClick={()=>{
          setIscalenderOpen(true)
          
        }} >
         <span> <CiCalendarDate /> </span> Filter by date
        </span>
      </div>
     )} 
        {
          isCalenderOpen && (
            <div className=' absolute w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-80'>
              <div ref={calendarRef} >
              <div   className=' w-[21.85rem] flex justify-end pr-3 -mt-10 pb-3 '>
                <button onClick={()=>{
                  setIscalenderOpen(false)
                }} className=' flex items-center text-white '>
                <IoCloseOutline size={33} /> <span className=' text-xl'>Close</span>
                </button>
              </div>
              <div className=' bg-white max-w-fit p-5 rounded-3xl rounded-b-none'>
               <DayPicker
          mode="single"
          selected={selected}
          onSelect={(selectedDay) => {
            setSelected(selectedDay); // Correctly update the selected day
            // setTimeout(() => {
              setIscalenderOpen(false); // Close the calendar after 200ms
            // }, 200);
          }}
          footer={
            selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
          }
          />
          </div>
          <div>
            <button onClick={()=>{
              setSelected();
              setIscalenderOpen(false)
            }} className=' mt-1 bg-[#dd0426] w-[21.85rem] py-3 text-lg text-white rounded-3xl rounded-t-none'>
              Clear filters
            </button>
          </div>
          </div>
          </div>

          )
        }
     
      {filteredJournalHistory?.map((chat , idx)=>{
        const borderColor =
        chat.sentiment === "positive"
          ? "border-green-600"
          : chat.sentiment === "negative"
          ? "border-red-600"
          : "border-orange-600"; // Default for neutral
        return (
          
          <div key={idx} className=' p-0 pt-4 lg:p-4 text-md'>
            <div className=' flex w-full justify-end mb-5 gap-x-3'>
              <div className={`bg-gray-200 p-2 lg:p-4 rounded-3xl rounded-tr-none border-2 border-opacity-75 ${borderColor}`}>
            <p className='text-base'>
              {chat.entry}
            </p>
            <p className=' text-sm'>
              {convertDate(chat.createdAt)}
            </p>
            </div>
            <div>
            <img
                src={userPicture}
                alt={user?.name || "User"}
                onError={handleImageError}
                onLoad={handleImageLoad}
                className="rounded-full w-8 h-8 lg:h-12 lg:w-12 object-cover"
                loading="lazy"
              />
            </div>
            </div>
            <div className=' flex  w-full lg:w-10/12 justify-start bg-white p-2 lg:p-4 rounded-3xl rounded-tl-none gap-x-3'>
              <img
                            src={ShibaHappy}
                            alt={"Shiba"}
                            className="rounded-full w-8 h-8 lg:h-12 lg:w-12 object-cover"
                            loading="lazy"
                          />
            <p className=' text-base lg:text-[20px]'>
              {chat.feedback}
            </p>
            </div>
          </div>
        )
      })}


      {filteredJournalHistory.length===0 &&(
        <div className=' flex flex-col w-full h-[80vh] justify-center gap-3 items-center p-4'>
          <div>
              <p>
                Date selected : { selected?.toLocaleDateString()}
              </p>
            </div>
          <div className=' flex gap-3'>
            
          <img src={NotFound} alt=""  className=' w-16' /> 
          <p className=' text-[28px]'>
           No entries found
            </p>
          </div>
          <div>
          <button onClick={()=>{
              setSelected();
              setIscalenderOpen(false)
            }} className=' mt-1 bg-[#dd0426] w-[21.85rem] py-3 text-lg text-white rounded-3xl'>
              Clear filters
            </button>
          </div>
            </div>

      )}
    </div>
  )
}

export default History
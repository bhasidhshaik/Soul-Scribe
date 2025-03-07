import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { getJournals } from "../api/api"; // Import the API function
import InfinityLoader from "../components/loader/InfinityLoader";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Insights = () => {
  const [journalHistory, setJournalHistory] = useState([]); // Holds all journal data
  const [weeklyData, setWeeklyData] = useState([]); // Holds filtered weekly data
    const [isPageLoading, setIsPageLoading] = useState(true)

  // Fetch all journals from the API
  const getAllJournals = async () => {
    try {
setIsPageLoading(true)
      const journals = await getJournals(); // API call
      // console.log('Journal rwspos' , journals);
      
      setJournalHistory(journals.data); // Store the fetched data
      setIsPageLoading(false);
    } catch (error) {
      console.error("Error while calling getJournals function", error);
    }
  };

  // Filter data for the current week (Sunday to Saturday)
  const getWeeklyData = () => {
    if (!journalHistory || journalHistory.length === 0) {
      console.log("Journal history is empty, skipping weekly data computation.");
      return;
    }
  
    console.log("Journal history before processing:", journalHistory);
  
    const currentWeek = new Array(7).fill(null);
    const today = new Date();
    
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(today.getDate() - today.getDay());
  
    console.log("Start of week:", startOfWeek);
  
    const dayCounts = new Array(7).fill(0);
  
    journalHistory.forEach((journal) => {
      if (!journal.createdAt) {
        console.warn("Journal entry missing createdAt field:", journal);
        return;
      }
  
      const journalDate = new Date(journal.createdAt);
      journalDate.setHours(0, 0, 0, 0);
  
      console.log("Processing journal entry:", journalDate);
  
      const dayIndex = Math.round((journalDate - startOfWeek) / (1000 * 60 * 60 * 24));
  
      if (dayIndex >= 0 && dayIndex < 7) {
        if (currentWeek[dayIndex] === null) {
          currentWeek[dayIndex] = 0;
        }
        currentWeek[dayIndex] += journal.sentimentScore;
        dayCounts[dayIndex] += 1;
      }
    });
  
    for (let i = 0; i < 7; i++) {
      if (currentWeek[i] !== null && dayCounts[i] > 0) {
        currentWeek[i] = currentWeek[i] / dayCounts[i];
      }
    }
  
    console.log("Final computed weekly data:", currentWeek);
  
    setWeeklyData(currentWeek);
  };
  

  useEffect(() => {
    getAllJournals(); // Fetch all journal data when the component mounts
  }, []);

  useEffect(() => {
    // console.log(journalHistory);w
    
    if (journalHistory.length > 0) {
      getWeeklyData(); // Filter data when journal history changes
    }
  }, [journalHistory]);

  const barColors = weeklyData.map((score) =>
    score !== null ? (score >= 0 ? "#4caf50" : "#f44336") : "#cccccc" // Green for positive, Red for negative, Gray for no data
  );

  // Chart Data
  const chartData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Weekdays
    datasets: [
      {
        label: "Sentiment Score",
        data: weeklyData.map((score) => (score !== null ? score : 0)), // Use `0` for days with no data
        backgroundColor:barColors,
        borderColor: "#000000",
        borderWidth: 1,
        barThickness: 80, // Fixed bar width
      maxBarThickness: 80, // Maximum width for bars
    //   barPercentage: 0.6, // Determines the percentage of space used by bars (default is 0.9)
    //   categoryPercentage: 0.6,
      },
    ],
  };
  console.log(weeklyData);
  

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Sentiment Insights",
        font: {
          size: 16, // Reduce title size
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10, // Smaller x-axis labels
          },
        },
        grid: {
          display: false, // Optional: Hide grid lines for cleaner look
        },
     
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sentiment Score",
          font: {
            size: 12, // Smaller y-axis title
          },
        },
        ticks: {
          font: {
            size: 10, // Smaller y-axis labels
          },
        },
        grid: {
          drawBorder: false, // Optional: Remove grid border lines
        },
      },
    },
  };
  
if(isPageLoading){
    return <div> <InfinityLoader /> </div>
}
  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      {/* {console.log(chartData)} */}
      <h2 className="text-center">Mental Health Insights (Weekly)</h2>
      <p className="text-center">Data will be updated every week.</p>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Insights;

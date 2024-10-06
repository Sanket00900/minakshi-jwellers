"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [showWinners, setShowWinners] = useState(false);
  const winners = ["Alice", "Bob", "Charlie"]; // Replace with actual winners

  useEffect(() => {
    // Check if winners are currently shown by reading from localStorage
    const showWinnersFlag = localStorage.getItem("showWinners") === "true";
    setShowWinners(showWinnersFlag);
  }, []);

  const handleToggleWinners = () => {
    const newShowWinners = !showWinners;
    setShowWinners(newShowWinners);
    localStorage.setItem("showWinners", newShowWinners ? "true" : "false"); // Toggle the flag in localStorage
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-[#000]">Admin Panel</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
        onClick={handleToggleWinners}
      >
        {showWinners ? "Hide Winners" : "Show Winners"}
      </button>
      {showWinners && (
        <>
          <h2 className="text-2xl font-bold mb-2 ">Winners</h2>
          <ul className="mb-4">
            {winners.map((winner, index) => (
              <li key={index} className="text-lg font-medium">
                {winner}
              </li>
            ))}
          </ul>
          <div className="w-full">
            <video
              controls
              className="w-full max-w-md rounded-md shadow-md"
              src="/lucky-draw-video.mp4" // Replace with actual video path
              alt="Lucky Draw Video"
            />
          </div>
        </>
      )}
    </div>
  );
}

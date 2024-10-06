"use client";
import { useState, useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Confetti from "react-confetti"; // Import the confetti package
import { Roboto } from "next/font/google";
import { useWindowSize } from "react-use"; // Import to dynamically get window size for confetti

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({});
  const [winnersShown, setWinnersShown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const winners = ["11", "9", "47", "24", "97"]; // Replace with actual winners

  const { width, height } = useWindowSize(); // Get the window size for the confetti

  useEffect(() => {
    const drawDate = new Date("2024-10-11T00:00:00"); // Set your draw date here
    const interval = setInterval(() => {
      const now = new Date();
      const diff = drawDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const showWinnersFlag = localStorage.getItem("showWinners");
    setWinnersShown(showWinnersFlag === "true");

    if (showWinnersFlag === "true") {
      // Display confetti only when winners are shown for the first time
      setShowConfetti(true);

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/bg.jpg')", // Background image path
        backgroundSize: "cover", // Ensures the background image covers the full screen
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // No repeating of the image
      }}
      className={`flex flex-col items-center text-center justify-center min-h-screen p-6 {inter.className}`}
    >
      {showConfetti && <Confetti width={width} height={height} />}{" "}
      {/* Render confetti */}
      <Image
        src={Logo}
        alt="Shop Logo"
        className={`w-32 h-32 mb-6 animate-bounce ${
          winnersShown ? "mt-[24rem]" : "mt-[18rem]"
        }`}
      />
      {!winnersShown ? (
        <>
          <h1 className="text-4xl text-[#d4af37] uppercase font-bold mb-[2rem]">
            Minakshi Jewellers
          </h1>
          <h1 className="text-3xl text-white font-bold mb-4 animate-pulse">
            Dussehra special lucky draw 🪔{" "}
          </h1>
          <p className="text-white mb-8 text-lg font-medium">
            Exciting prizes await you! Draw in:
          </p>
          {timeLeft ? (
            <div className="flex gap-4 text-2xl font-semibold text-white bg-black bg-opacity-40 p-4 rounded-lg shadow-lg">
              <div>
                {timeLeft?.days} <span className="text-sm">Days</span>
              </div>
              <div>
                {timeLeft?.hours} <span className="text-sm">Hours</span>
              </div>
              <div>
                {timeLeft?.minutes} <span className="text-sm">Minutes</span>
              </div>
              <div>
                {timeLeft?.seconds} <span className="text-sm">Seconds</span>
              </div>
            </div>
          ) : (
            <p className="text-white text-xl">The lucky draw has ended!</p>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl text-yellow-400 font-bold mb-6 text-center">
            Winner's Leaderboard
          </h1>
          <ul className="mb-8 text-white text-xl bg-white bg-opacity-20 p-6 rounded-lg shadow-lg max-w-md w-full">
            {winners.map((winner, index) => (
              <li
                key={index}
                className="font-bold text-lg bg-[#d4af37] bg-opacity-50 mb-2 p-3 rounded-md shadow-md"
              >
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

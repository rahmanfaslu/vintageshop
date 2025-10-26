import React, { useState, useRef } from "react";
import { CirclePlay, CirclePause } from "lucide-react";

export default function App() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [gramoPlaying, setGramoPlaying] = useState(false);

  // Audio setup
  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio("/devadoothan bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;
  }

  const radioRef = useRef(new Audio("/radio.mp3"));
  const gramoRef = useRef(new Audio("/gramaphone.mp3"));

  // Toggle frame sound
  const handlePlayPause = () => {
    const bgm = audioRef.current;
    if (isPlaying) bgm.pause();
    else bgm.play();
    setIsPlaying(!isPlaying);
  };

  // Light switch toggle
  const handleSwitch = () => {
    const sound = new Audio("/light-switch.mp3");
    sound.play();
    setIsLightOn(!isLightOn);
  };

  // Radio controls
  const toggleRadio = () => {
    if (radioPlaying) radioRef.current.pause();
    else radioRef.current.play();
    setRadioPlaying(!radioPlaying);
  };
  const handleRadioVolume = (e) => {
    radioRef.current.volume = e.target.value;
  };

  // Gramophone controls
  const toggleGramo = () => {
    if (gramoPlaying) gramoRef.current.pause();
    else gramoRef.current.play();
    setGramoPlaying(!gramoPlaying);
  };
  const handleGramoVolume = (e) => {
    gramoRef.current.volume = e.target.value;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 🌟 Light Switch Section */}
      <div className="absolute z-20 flex flex-col items-center">
        {/* Desktop Switch */}
       <button
  onClick={handleSwitch}
  className="hidden sm:block h-70 w-30 ml-60 mt-30 bg-amber-1 absolute shadow-lg z-20"
></button>


        {/* Mobile Button */} 
        <button onClick={handleSwitch}
         className="h-10 w-30 bg-amber-100 rounded-2xl absolute shadow-lg z-20 sm:hidden left-10 -translate-x-1/2 top-80"
          >ON/OFF</button> 
        <span className="text-white text-xs mt-1 hidden sm:block"></span>
      </div>

      {/* 💡 Click Frame Section */}
      <div className="fixed top-0 left-0 w-full h-full sm:block flex justify-center items-center">
        {/* Click text */}
        <p className="absolute text-amber-50 text-center w-40 rotate-2 ml-[500px] mt-[250px] z-20 hidden sm:block leading-4">
          click the<br />Frame
        </p>

        {/* Frame image */}
        <img
          onClick={handlePlayPause}
          src="/frame.png"
          alt="frame"
          className={`absolute shadow-[0_8px_25px_rgba(0,0,0,0.6)]
            ${isLightOn ? "brightness-100" : "brightness-60"}
            cursor-pointer transition-all duration-300 z-30
            h-32 w-25 ml-[540px] mt-[165px]
            sm:absolute sm:ml-[620px] sm:mt-[165px]
            max-sm:relative max-sm:w-28 max-sm:h-auto max-sm:mx-auto max-sm:-translate-y-[150px]
          `}
        />
      </div>

      {/* 🌌 Background Light */}
      <img
        src={isLightOn ? "/light-on.png" : "/light-off.png"}
        alt="background light"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* 🎛 Bottom Control Panel */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-row items-center
        bg-white/10 backdrop-blur-md p-6 rounded-xl gap-3 shadow-lg w-[400px]
        max-sm:flex-col max-sm:w-[300px] max-sm:p-4 max-sm:bottom-28"
      >
        {/* 🎙 Radio Controls */}
        <div className="flex flex-col items-center w-full space-y-2">
          <button
            onClick={toggleRadio}
            className="px-4 py-2 bg-white/10 rounded-md shadow hover:bg-white/20 flex justify-center items-center gap-2 text-white text-sm"
          >
            {radioPlaying ? <CirclePause size={20} /> : <CirclePlay size={20} />} Radio
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={radioRef.current.volume}
            onChange={handleRadioVolume}
            className="h-2 rounded bg-gray-400 accent-white cursor-pointer w-32"
          />
        </div>

        {/* 🎵 Gramophone Controls */}
        <div className="flex flex-col items-center w-full space-y-2">
          <button
            onClick={toggleGramo}
            className="px-4 py-2 bg-white/10 rounded-md shadow hover:bg-white/20 w-40 flex justify-center items-center text-white gap-2 text-sm"
          >
            {gramoPlaying ? <CirclePause size={20} /> : <CirclePlay size={20} />} Gramophone
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue={gramoRef.current.volume}
            onChange={handleGramoVolume}
            className="h-2 rounded bg-gray-400 accent-white cursor-pointer w-32"
          />
        </div>
      </div>

      {/* 📱 Mobile notice */}
      <p className="absolute bottom-2 w-full text-center text-white text-xs opacity-80 sm:hidden max-sm:bottom-20">
        Open in desktop view to get full experience
      </p>
    </div>
  );
}

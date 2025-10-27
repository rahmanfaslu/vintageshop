import React, { useState, useRef } from "react";
import './App.css'
import { CirclePlay, CirclePause } from "lucide-react";

export default function App() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [gramoPlaying, setGramoPlaying] = useState(false);

  // Audio
  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio("/devadoothan bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;
  }

  const radioRef = useRef(new Audio("/radio.mp3"));
  const gramoRef = useRef(new Audio("/gramaphone.mp3"));

  // Frame sound
  const handlePlayPause = () => {
    const bgm = audioRef.current;
    if (isPlaying) bgm.pause();
    else bgm.play();
    setIsPlaying(!isPlaying);
  };

  // Light switch
  const handleSwitch = () => {
    const sound = new Audio("/light-switch.mp3");
    sound.play();
    setIsLightOn(!isLightOn);
  };

  // Radio  
  const toggleRadio = () => {
    if (radioPlaying) radioRef.current.pause();
    else radioRef.current.play();
    setRadioPlaying(!radioPlaying);
  };
  const handleRadioVolume = (e) => {
    radioRef.current.volume = e.target.value;
  };

  // Gramophone  
  const toggleGramo = () => {
    if (gramoPlaying) gramoRef.current.pause();
    else gramoRef.current.play();
    setGramoPlaying(!gramoPlaying);
  };
  const handleGramoVolume = (e) => {
    gramoRef.current.volume = e.target.value;
  };

  // Detect mobile screen (one-time check)
  const isMobile = window.innerWidth < 640;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black"> 
      {/* Light Switch */}
      <div className="absolute z-20 flex flex-col items-center">
        {/* Desktop Switch */}
        <button
          onClick={handleSwitch}
          className="hidden sm:block h-[270px] w-[120px] ml-60 mt-30 absolute shadow-lg z-20 rounded-lg"
        ></button>

        {/* Mobile Switch */} 
        <button 
          onClick={handleSwitch}
          className="h-8 w-20 bg-amber-100 rounded-xl absolute shadow-lg z-20 sm:hidden left-6 top-60 text-xs font-medium"
        >
          ON/OFF
        </button> 
      </div>

      {/* Click Frame */}
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
        {/* Click text */}
        {!isMobile && (
          <p
            className="absolute text-amber-50 opacity-60 font-semibold text-center w-25 z-20 leading-4 text-sm hidden sm:block"
            style={{
              top: "270px",
              left: "600px",
            }}
          >
            ക്ലിക്ക് ചെയ്യൂ..
          </p>
        )}

        {/* Frame image */}
        <img
          onClick={handlePlayPause}
          src="/frame.png"
          alt="frame"
          className={`absolute 
            h-32 w-24 ml-[540px] mt-[165px] shadow-[0_8px_25px_rgba(0,0,0,0.6)]
            ${isLightOn ? "brightness-100" : "brightness-60"}
            cursor-pointer transition-all duration-300 z-30 pointer-events-auto
            sm:absolute sm:ml-[-50px] sm:mt-[-200px]
            max-sm:relative max-sm:w-22 max-sm:h-auto max-sm:mx-auto max-sm:-translate-y-[155px]
          `}
        />
      </div>

      {/* Background Light */}
      <div className="fixed inset-0 flex justify-center items-center">
        <img
          src={isLightOn ? "/light-on.png" : "/light-off.png"}
          alt="background light"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Audio Control Panel */}
      <div
        className="fixed bottom-16 left-1/2 -translate-x-1/2 flex flex-row items-center
        bg-white/10 backdrop-blur-md p-6 rounded-xl gap-4 shadow-lg w-[400px] h-[140px]
        max-sm:flex-col max-sm:w-[280px] max-sm:p-3 max-sm:bottom-20 max-sm:gap-3 max-sm:h-auto z-40"
      > 
        {/* Radio Controls */}
        <div className="flex flex-col items-center w-full space-y-2">
          <button
            onClick={toggleRadio}
            className="px-4 py-2 bg-white/10 rounded-md shadow hover:bg-white/20 flex justify-center items-center gap-2 text-white text-base"
          >
            {radioPlaying ? <CirclePause size={22} /> : <CirclePlay size={22} />} Radio
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

        {/* Gramophone Controls */}
        <div className="flex flex-col items-center w-full space-y-2">
          <button
            onClick={toggleGramo}
            className="px-4 py-2 bg-white/10 rounded-md shadow hover:bg-white/20 flex justify-center items-center text-white gap-2 text-base w-36"
          >
            {gramoPlaying ? <CirclePause size={22} /> : <CirclePlay size={22} />} Gramo
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
      <div >
      <p className="bg-white/9 w-40 p-2 rounded-2xl h-auto ml-270 mt-140  text-amber-100   inline-flex absolute  ">'ഓർമ്മകളുടെ സംഗീതം'</p>
      </div>

      {/* Mobile Note */}
      <p className="fixed bottom-2 w-full text-center text-white text-xs opacity-80 sm:hidden max-sm:bottom-16 z-40">
        Open in desktop to get full experience
      </p>
    </div>
  );
}

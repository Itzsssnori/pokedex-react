import { useState, useEffect, useRef } from "react";

import overworldImage from "../assets/overworld.png";
import trainerImage from "../assets/trainer.png";
import overworldMusic from "../assets/audio/overworld.mp3";

const dialogues = [
  "HI THERE!",

  "WELCOME TO MY POKÉMON COLLECTION! I'VE BEEN WORKING ON THIS FOR A WHILE, SO I FIGURED I SHOULD FINALLY SHOW IT OFF.",

  "I'VE ALWAYS LIKED THE IDEA OF TRAINING A TEAM WHERE EVERY POKÉMON HAS ITS OWN ROLE, ITS OWN PERSONALITY, AND ITS OWN STORY.",

  "THESE POKÉMON AREN'T JUST HERE TO LOOK COOL. WELL... THEY DO LOOK COOL, BUT THAT'S NOT THE ENTIRE POINT.",

  "SOME OF THEM WERE CAUGHT IN THE WILD, WHILE OTHERS HAVE BEEN WITH ME SINCE THE BEGINNING OF MY JOURNEY.",

  "I'VE SPENT A LOT OF TIME TRAINING THEM, LEARNING THEIR STRENGTHS, AND FIGURING OUT HOW THEY WORK TOGETHER AS A TEAM.",

  "EVERY TRAINER HAS A DIFFERENT WAY OF PLAYING. FOR ME, I LIKE EXPERIMENTING, LEARNING FROM MY MISTAKES, AND TRYING AGAIN.",

  "THIS COLLECTION IS ALSO A SMALL LOOK INTO WHO I AM OUTSIDE OF THE BATTLEFIELD, INCLUDING THE THINGS I'VE LEARNED ALONG THE WAY.",

  "MY JOURNEY AS A COMPUTER SCIENCE STUDENT IS STILL JUST BEGINNING, SO I'M STILL TRAINING, BUILDING, BREAKING THINGS, AND LEARNING HOW TO FIX THEM.",

  "THERE ARE PLENTY OF THINGS I STILL DON'T KNOW. HONESTLY, THAT'S PROBABLY THE MOST INTERESTING PART OF LEARNING SOMETHING NEW.",

  "I WANT TO KEEP GETTING BETTER, BUILDING BETTER PROJECTS, AND EVENTUALLY CREATING THINGS THAT FEEL LIKE THEY COULD EXIST OUTSIDE OF A CLASSROOM.",

  "SO TAKE A LOOK AROUND, TRAINER. CHECK OUT MY POKÉMON, MY TRAINER CARD, AND THE REST OF MY JOURNEY.",

  "WHEN YOU'RE READY, OPEN THE MENU. THERE'S STILL PLENTY MORE TO DISCOVER.",
];
function Overworld({ setActiveModal, activeModal }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const [displayedText, setDisplayedText] = useState("");

  const [isTyping, setIsTyping] = useState(true);

  const [dialogueFinished, setDialogueFinished] = useState(false);

  const [isMusicPaused, setIsMusicPaused] = useState(false);

  const audioRef = useRef(null);

  const typingTimerRef = useRef(null);

  function startMusic() {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
      });
    }
  }

  function finishTyping() {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setDisplayedText(dialogues[dialogueIndex]);

    setIsTyping(false);
  }

  function nextDialogue() {
    startMusic();

    if (isTyping) {
      finishTyping();

      return;
    }
    if (dialogueFinished) {
      setDialogueIndex(0);

      setDialogueFinished(false);

      return;
    }

    if (dialogueIndex === dialogues.length - 1) {
      setDialogueFinished(true);

      return;
    }

    setDialogueIndex((currentIndex) => currentIndex + 1);
  }

  function previousDialogue() {
    startMusic();

    if (isTyping) {
      finishTyping();

      return;
    }

    if (dialogueFinished) {
      setDialogueFinished(false);

      setDialogueIndex(dialogues.length - 1);

      return;
    }

    if (dialogueIndex === 0) {
      return;
    }
    setDialogueIndex((currentIndex) => currentIndex - 1);
  }

  function toggleMusic() {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.paused) {
      startMusic();

      setIsMusicPaused(false);
    } else {
      audioRef.current.pause();

      setIsMusicPaused(true);
    }
  }

  useEffect(() => {
    startMusic();
  }, []);

  useEffect(() => {
    if (dialogueFinished) {
      setDisplayedText("");

      setIsTyping(false);

      return;
    }

    setDisplayedText("");

    setIsTyping(true);

    let characterIndex = 0;

    typingTimerRef.current = setInterval(() => {
      if (characterIndex < dialogues[dialogueIndex].length) {
        setDisplayedText(dialogues[dialogueIndex].slice(0, characterIndex + 1));

        characterIndex++;
      } else {
        clearInterval(typingTimerRef.current);

        setIsTyping(false);
      }
    }, 45);

    return () => {
      clearInterval(typingTimerRef.current);
    };
  }, [dialogueIndex, dialogueFinished]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key.toLowerCase() === "x") {
        nextDialogue();
      }

      if (event.key.toLowerCase() === "z") {
        previousDialogue();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogueIndex, isTyping, dialogueFinished]);

  return (
    <div className="overworld">
      {/* Background */}
      <img className="overworld-map" src={overworldImage} alt="Overworld" />
      <div className="trainer-wrapper">
        <img className="trainer" src={trainerImage} alt="Trainer-Nori" />

        <img
          className="overworld-eevee"
          src="https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif"
          alt="Eevee"
        />

        <div className="trainer-name">
          <span>NORI</span>
          <div className="trainer-cursor">▼</div>
        </div>
      </div>

      <audio ref={audioRef} src={overworldMusic} loop />

      <button
        className={`music-button ${isMusicPaused ? "paused" : "playing"}`}
        onClick={toggleMusic}
        aria-label={isMusicPaused ? "Play music" : "Pause music"}
      >
        <span className="music-icon"></span>
      </button>

      {activeModal === "NONE" && (
        <div className="dialogue-box" onClick={nextDialogue}>
          <div className="dialogue-text">
            <div className="dialogue-speaker">NORI:</div>

            <p>{dialogueFinished ? "[END OF DIALOGUE]" : displayedText}</p>
          </div>

          <div className="dialogue-bottom">
            <div className="dialogue-controls">
              X NEXT&nbsp;&nbsp;&nbsp; Z BACK
            </div>

            <div className="dialogue-cursor">▼</div>
          </div>
        </div>
      )}

      <button
        className="menu-button"
        onClick={() => {
          setActiveModal("START_MENU");
        }}
      >
        MENU
      </button>
    </div>
  );
}

export default Overworld;

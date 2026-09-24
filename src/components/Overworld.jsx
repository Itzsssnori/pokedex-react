import { useState, useEffect, useRef } from "react";
import { playOpenSound, playCloseSound, playClickSound } from "../utils/sound";
import overworldImage from "../assets/overworld.png";
import trainerImage from "../assets/trainer.png";
import overworldMusic from "../assets/audio/overworld.mp3";

const dialogues = [

  "HI THERE!",

  "WELCOME TO MY POKÉMON COLLECTION. I'VE BEEN WORKING ON THIS FOR A WHILE, SO I FIGURED IT WAS TIME TO LET SOMEONE ELSE SEE IT.",

  "I'VE ALWAYS LIKED BUILDING A TEAM WHERE EVERY POKÉMON HAS ITS OWN ROLE, PERSONALITY, AND STORY.",

  "SOME WERE CAUGHT IN THE WILD. OTHERS HAVE BEEN AROUND SINCE THE BEGINNING OF MY JOURNEY.",

  "TRAINING THEM TAUGHT ME SOMETHING SIMPLE: A GOOD TEAM ISN'T JUST ABOUT HAVING STRONG INDIVIDUALS. IT'S ABOUT LEARNING HOW THEY WORK TOGETHER.",

  "I THINK THAT'S A LOT LIKE PROGRAMMING.",

  "YOU BUILD SOMETHING, TEST IT, BREAK IT, WONDER WHY IT BROKE, AND THEN SPEND WAY TOO LONG FIGURING OUT WHAT YOU DID WRONG.",

  "AS A COMPUTER SCIENCE STUDENT, I'M STILL EARLY IN MY OWN JOURNEY.",

  "I'M LEARNING HOW TO BUILD SOFTWARE, WORK WITH DATA, DESIGN SYSTEMS, AND UNDERSTAND WHAT ACTUALLY HAPPENS BEHIND THE SCREEN.",

  "I DON'T KNOW EVERYTHING YET. THERE'S A LOT I STILL HAVE TO LEARN, AND HONESTLY, THAT'S PART OF WHAT MAKES THIS INTERESTING.",

  "EVERY PROJECT GIVES ME SOMETHING NEW TO FIGURE OUT. SOMETIMES IT WORKS. SOMETIMES IT VERY DEFINITELY DOES NOT.",

  "BUT EACH TIME, I COME AWAY A LITTLE BETTER THAN I WAS BEFORE.",

  "SO TAKE A LOOK AROUND, TRAINER.",

  "CHECK OUT MY POKÉMON, MY TRAINER CARD, AND THE PROJECTS I'VE BUILT ALONG THE WAY.",

  "THIS IS ONLY THE BEGINNING OF MY JOURNEY.",

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
      audioRef.current.play().catch(() => {});
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
    playClickSound();

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
        <img
    className="overworld-venusaur"
    src="https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur-f.gif"
    alt="Venusaur"
/>

<img
    className="overworld-poliwrath"
    src="https://img.pokemondb.net/sprites/black-white/anim/normal/poliwrath.gif"
    alt="Poliwrath"
/>

<img
    className="overworld-snorlax"
    src="https://img.pokemondb.net/sprites/black-white/anim/normal/snorlax.gif"
    alt="Snorlax"
/>

<img
    className="overworld-pikachu"
    src="https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif"
    alt="Pikachu"
/>

<img
    className="overworld-aerodactyl"
    src="https://img.pokemondb.net/sprites/black-white/anim/normal/aerodactyl.gif"
    alt="Aerodactyl"
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
        <div
          className="dialogue-box"
          onClick={() => {
            playClickSound();
            nextDialogue();
          }}
        >
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
          playOpenSound();
          setActiveModal("START_MENU");
        }}
      >
        MENU
      </button>
    </div>
  );
}

export default Overworld;

import openSound from "../assets/audio/open.mp3";
import closeSound from "../assets/audio/close.mp3";
import clickSound from "../assets/audio/click.mp3";

export const playOpenSound = () => {
  const audio = new Audio(openSound);
  audio.volume = 0.5;
  audio.play();
};

export const playCloseSound = () => {
  const audio = new Audio(closeSound);
  audio.volume = 0.5;
  audio.play();
};

export const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.volume = 0.5;
  audio.play();
};

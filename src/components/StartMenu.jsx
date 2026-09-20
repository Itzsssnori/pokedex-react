import { playOpenSound, playCloseSound, playClickSound } from "../utils/sound";
function StartMenu({ setActiveModal }) {
  return (
    <div className="start-menu">
      <h2>START MENU</h2>

      <button onClick={() => setActiveModal("POKEDEX")}>POKEDEX</button>

      <button onClick={() => setActiveModal("POKEMON")}>POKEMON</button>

      <button onClick={() => setActiveModal("TRAINER")}>TRAINER</button>

      <button onClick={() => setActiveModal("NONE")}>EXIT</button>
    </div>
  );
}

export default StartMenu;

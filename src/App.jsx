import { useState } from "react";
import StartMenu from "./components/StartMenu";
import TrainerModal from "./components/TrainerModal";
import Overworld from "./components/Overworld";
import PokemonModal from "./components/PokemonModal";
import PokedexModal from "./components/PokedexModal";

function App() {
  const [activeModal, setActiveModal] = useState("NONE");

  const closeModal = () => {
    setActiveModal("NONE");
  };

  return (
    <div>
      <Overworld setActiveModal={setActiveModal} activeModal={activeModal} />

      {activeModal === "START_MENU" && (
        <StartMenu setActiveModal={setActiveModal} />
      )}
      
      {activeModal === "POKEDEX" && <PokedexModal onClose={closeModal} />}
      {activeModal === "POKEMON" && <PokemonModal onClose={closeModal} />}
      {activeModal === "TRAINER" && <TrainerModal onClose={closeModal} />}
    </div>
  );
}

export default App;

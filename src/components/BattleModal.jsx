import { useEffect, useState } from "react";

import battleBackground from "../assets/battle-background.png";
import battleSelectBg from "../assets/battle-select-bg.png";

const playerParty = [
  { id: 3, level: 57 },
  { id: 62, level: 55 },
  { id: 143, level: 54 },
  { id: 133, level: 55 },
  { id: 25, level: 58 },
  { id: 142, level: 57 },
];

function BattleModal({ onClose }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState(null);

  const [battleStage, setBattleStage] = useState("SELECT");

  const [battleAction, setBattleAction] = useState("MENU");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=386",
        );

        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
          }),
        );

        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  function chooseOpponent(pokemon) {
    setSelectedPokemon(pokemon);
    setBattleStage("PLAYER_SELECT");
  }

  async function choosePlayerPokemon(partyPokemon) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${partyPokemon.id}`,
      );

      const data = await response.json();

      setPlayerPokemon({
        ...data,
        level: partyPokemon.level,
      });

      setBattleStage("BATTLE");
    } catch (error) {
      console.error("Failed to load player Pokémon:", error);
    }
  }

  function backToSelection() {
    setSelectedPokemon(null);
    setPlayerPokemon(null);
    setBattleStage("SELECT");
  }

  return (
    <div className="battle-modal">
      <div className="battle-header">
        <h2>BATTLE</h2>

        <button className="battle-close" onClick={onClose}>
          CLOSE
        </button>
      </div>

      <div
        className="battle-screen"
        style={{
          backgroundImage:
            battleStage === "BATTLE"
              ? `url(${battleBackground})`
              : `url(${battleSelectBg})`,
        }}
      >
        {loading && (
          <div className="battle-loading">
            <div className="loading-pokeball">
              <div className="loading-pokeball-button"></div>
            </div>

            <p>LOADING POKÉMON...</p>
          </div>
        )}

        {!loading && battleStage === "SELECT" && (
          <div className="battle-selection">
            <h3>CHOOSE AN OPPONENT</h3>

            <div className="battle-pokemon-scroll">
              <div className="battle-pokemon-list">
                {pokemonList.map((pokemon) => (
                  <button
                    key={pokemon.id}
                    className="battle-pokemon-entry"
                    onClick={() => chooseOpponent(pokemon)}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />

                    <span>
                      #{String(pokemon.id).padStart(3, "0")}{" "}
                      {pokemon.name.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {!loading && battleStage === "PLAYER_SELECT" && selectedPokemon && (
          <div className="battle-player-selection">
            <h3>CHOOSE YOUR POKÉMON</h3>

            <p className="battle-selected-opponent">
              OPPONENT: {selectedPokemon.name.toUpperCase()}
            </p>

            <div className="battle-party-list">
              {playerParty.map((partyPokemon) => {
                const pokemonData = pokemonList.find(
                  (pokemon) => pokemon.id === partyPokemon.id,
                );

                if (!pokemonData) return null;

                return (
                  <button
                    key={partyPokemon.id}
                    className="battle-party-entry"
                    onClick={() => choosePlayerPokemon(partyPokemon)}
                  >
                    <img
                      src={pokemonData.sprites.front_default}
                      alt={pokemonData.name}
                    />

                    <span>{pokemonData.name.toUpperCase()}</span>

                    <small>Lv. {partyPokemon.level}</small>
                  </button>
                );
              })}
            </div>

            <button className="battle-back-button" onClick={backToSelection}>
              BACK
            </button>
          </div>
        )}

        {!loading &&
          battleStage === "BATTLE" &&
          selectedPokemon &&
          playerPokemon && (
            <div className="battle-arena">
              <div className="battle-opponent-info">
                <div className="battle-name-level">
                  <span>{selectedPokemon.name.toUpperCase()}</span>

                  <span>Lv. 50</span>
                </div>

                <div className="battle-hp">
                  <span>HP</span>

                  <div className="hp-bar">
                    <div className="hp-fill"></div>
                  </div>
                </div>
              </div>

              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="battle-opponent-sprite"
              />

              <img
                src={playerPokemon.sprites.back_default}
                alt={playerPokemon.name}
                className="battle-player-sprite"
              />

              <div className="battle-player-info">
                <div className="battle-name-level">
                  <span>{playerPokemon.name.toUpperCase()}</span>

                  <span>Lv. {playerPokemon.level}</span>
                </div>

                <div className="battle-hp">
                  <span>HP</span>

                  <div className="hp-bar">
                    <div className="hp-fill"></div>
                  </div>
                </div>
              </div>

              {battleAction === "MENU" && (
                <div className="battle-command-box battle-intro-box">
                  <div className="battle-message">
                    A wild {selectedPokemon.name.toUpperCase()} appeared!
                  </div>

                  <button
                    className="battle-fight-button"
                    onClick={() => setBattleAction("FIGHT")}
                  >
                    FIGHT
                  </button>
                </div>
              )}

              {battleAction === "FIGHT" && (
                <div className="battle-command-box">
                  <div className="battle-move-list">
                    <button className="battle-move-button">MOVE 1</button>

                    <button className="battle-move-button">MOVE 2</button>

                    <button className="battle-move-button">MOVE 3</button>

                    <button className="battle-move-button">MOVE 4</button>
                  </div>

                  <div className="battle-move-info">
                    <div className="move-info-row">
                      <span>PP</span>
                      <strong>15/15</strong>
                    </div>

                    <div className="move-info-row">
                      <span>TYPE</span>
                      <strong>ELECTRIC</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

export default BattleModal;

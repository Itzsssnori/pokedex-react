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
  const [selectedMove, setSelectedMove] = useState(null);
  const [selectedMoveData, setSelectedMoveData] = useState(null);
  const [opponentHP, setOpponentHP] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [damageDealt, setDamageDealt] = useState(0);
  

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
const chooseOpponent = (pokemon) => {
    setSelectedPokemon(pokemon);
    setOpponentHP(100);
    setPlayerPokemon(null);
    setSelectedMove(null);
    setSelectedMoveData(null);
    setBattleAction("MENU");
    setDamageDealt(0);
    setIsAttacking(false);

    setBattleStage("PLAYER_SELECT");
};

const choosePlayerPokemon = async (partyPokemon) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${partyPokemon.id}`
        );

        const data = await response.json();

        setPlayerPokemon({
            ...data,
            level: partyPokemon.level,
        });

        // Fresh battle state
        setOpponentHP(100);
        setSelectedMove(null);
        setSelectedMoveData(null);
        setBattleAction("MENU");
        setDamageDealt(0);
        setIsAttacking(false);

        setBattleStage("BATTLE");
    } catch (error) {
        console.error("Failed to load player Pokémon:", error);
    }
};
 const backToSelection = () => {
    setSelectedPokemon(null);
    setPlayerPokemon(null);
    setBattleStage("SELECT");
    setBattleAction("MENU");
    setSelectedMove(null);
    setSelectedMoveData(null);
    setOpponentHP(100);
    setIsAttacking(false);
    setDamageDealt(0);
};
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
                    <div
                      className="hp-fill"
                      style={{ width: `${opponentHP}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className={`battle-opponent-sprite ${
    isAttacking ? "pokemon-hit" : ""
} ${opponentHP === 0 ? "pokemon-fainted" : ""}`}
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
                    FIGHT [DEMO]
                  </button>
                </div>
              )}

              {battleAction === "FIGHT" && (
                <div className="battle-command-box">
                  <div className="battle-move-list">
                    {playerPokemon.moves.slice(0, 4).map((move, index) => (
                      <button
                        key={move.move.name}
                        className={`battle-move-button ${
                          selectedMove === move.move.name ? "selected" : ""
                        }`}
                        onClick={async () => {
                          try {
                            // Clicking the already-selected move uses it
                            if (selectedMove === move.move.name) {
                              setBattleAction("ATTACK");
                              return;
                            }

                            const response = await fetch(move.move.url);
                            const data = await response.json();

                            setSelectedMove(move.move.name);
                            setSelectedMoveData(data);
                          } catch (error) {
                            console.error("Failed to load move:", error);
                          }
                        }}
                      >
                        {move.move.name.replace("-", " ").toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="battle-move-info">
                    {selectedMoveData ? (
                      <>
                        <div className="move-info-row">
                          <span>PP</span>
                          <strong>
                            {selectedMoveData.pp}/{selectedMoveData.pp}
                          </strong>
                        </div>

                        <div className="move-info-row">
                          <span>TYPE</span>
                          <strong>
                            {selectedMoveData.type.name.toUpperCase()}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <div className="move-info-placeholder">SELECT A MOVE</div>
                    )}
                    {selectedMoveData && (
                      <div className="move-select-hint">
                        SELECT AGAIN TO USE
                      </div>
                    )}
                  </div>
                </div>
              )}

             {battleAction === "ATTACK" && selectedMove && (
    <div className="battle-command-box battle-attack-box">
        <div className="battle-message">
            {playerPokemon.name.toUpperCase()} used{" "}
            {selectedMove.replace("-", " ").toUpperCase()}!
        </div>

        <button
            className="battle-continue-button"
            onClick={() => {
                setIsAttacking(true);

                const damage = Math.max(
                    10,
                    Math.round((selectedMoveData?.power || 40) / 2)
                );

                setDamageDealt(damage);

                setTimeout(() => {
                    setOpponentHP((currentHP) => {
                        const remainingHP = Math.max(currentHP - damage, 0);

                        if (remainingHP === 0) {
                            setBattleAction("DEFEAT");
                        } else {
                            setBattleAction("RESULT");
                        }

                        return remainingHP;
                    });

                    setIsAttacking(false);
                }, 500);
            }}
        >
            NEXT
        </button>
    </div>
)}
{battleAction === "DEFEAT" && (
    <div className="battle-command-box battle-attack-box">
        <div className="battle-message">
            The wild {selectedPokemon.name.toUpperCase()} fainted!
        </div>

        <button
            className="battle-continue-button"
            onClick={backToSelection}
        >
            END DEMO
        </button>
    </div>
)}

              {battleAction === "RESULT" && selectedMove && (
    <div className="battle-command-box battle-attack-box">
        <div className="battle-message">
            What would you like to do next?
        </div>

        <div className="battle-result-buttons">
            <button
                className="battle-continue-button"
                onClick={() => {
                    setBattleAction("MENU");
                    setSelectedMove(null);
                    setSelectedMoveData(null);
                }}
            >
                CONTINUE
            </button>

            <button
                className="battle-continue-button"
                onClick={backToSelection}
            >
                END DEMO
            </button>
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

import { useState, useEffect } from "react";
import pokemon from "../data/pokemonData";
import { playOpenSound, playCloseSound, playClickSound } from "../utils/sound";

function PokemonModal({ onClose }) {
  const [selectedPokemon, setSelectedPokemon] = useState(pokemon[0]);
  useEffect(() => {
    playOpenSound();
  }, []);
  return (
    <div className="pokemon-modal">
      <div className="pokemon-header">
        <h2>POKÉMON</h2>

        <button
          className="pokemon-close"
          onClick={() => {
            playCloseSound();
            onClose();
          }}
        >
          CLOSE
        </button>
      </div>

      <div className="pokemon-screen">
        <div className="pokemon-details">
          <div className="selected-label">SELECTED</div>

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/${selectedPokemon.id}.png`}
            alt={selectedPokemon.name}
          />

          <div className="selected-name-row">
            <h2>
              {selectedPokemon.name}

              <span
                className={`pokemon-gender ${
                  selectedPokemon.gender === "♂" ? "male" : "female"
                }`}
              >
                {selectedPokemon.gender}
              </span>
            </h2>

            <span>Lv.{selectedPokemon.level}</span>
          </div>

          <div className="selected-hp">
            <span>HP</span>

            <div className="selected-hp-bar">
              <div
                className="selected-hp-fill"
                style={{
                  width: `${
                    (selectedPokemon.hp / selectedPokemon.maxHp) * 100
                  }%`,
                }}
              ></div>
            </div>

            <span>
              {selectedPokemon.hp}/{selectedPokemon.maxHp}
            </span>
          </div>

          <p className="selected-type">{selectedPokemon.type}</p>
        </div>

        <div className="pokemon-party">
          {pokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className={`pokemon-entry ${
                selectedPokemon.name === pokemon.name ? "selected" : ""
              }`}
              onClick={() => {
                playClickSound();
                setSelectedPokemon(pokemon);
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/${pokemon.id}.png`}
                alt={pokemon.name}
              />

              <div>
                <h3>
                  {pokemon.name}

                  <span
                    className={`party-gender ${
                      pokemon.gender === "♂" ? "male" : "female"
                    }`}
                  >
                    {pokemon.gender}
                  </span>
                </h3>

                <p>Lv. {pokemon.level}</p>

                <p>
                  HP {pokemon.hp} / {pokemon.maxHp}
                </p>

                <div className="hp-bar">
                  <div
                    className="hp-fill"
                    style={{
                      width: `${(pokemon.hp / pokemon.maxHp) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;

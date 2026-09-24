import { useState, useEffect } from "react";
import { playOpenSound, playCloseSound, playClickSound } from "../utils/sound";
import pokedexLoadingBg from "../assets/pokedexLoadingBg.png";
function PokedexModal({ onClose }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loadingDots, setLoadingDots] = useState("");

  function formatName(name) {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    playOpenSound();
  }, []);
  useEffect(() => {
    if (!loading) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingDots((dots) => {
        if (dots.length >= 3) {
          return "";
        }

        return dots + ".";
      });
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=386")
      .then((response) => response.json())

      .then((data) => {
        const requests = data.results.map((pokemon) => {
          return fetch(pokemon.url).then((response) => response.json());
        });

        Promise.all(requests)

          .then(async (data) => {
            const pokemonWithSpecies = await Promise.all(
              data.map(async (pokemon) => {
                const response = await fetch(
                  `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`,
                );

                const speciesData = await response.json();

                const genus = speciesData.genera.find(
                  (entry) => entry.language.name === "en",
                );

                return {
                  ...pokemon,
                  species: genus ? genus.genus : "Unknown Pokémon",
                };
              }),
            );

            setPokemonList(pokemonWithSpecies);

            setLoading(false);
          });
      });
  }, []);

  useEffect(() => {
    if (selectedPokemon === null) {
      return;
    }

    const details = document.querySelector(".pokedex-details");

    if (details) {
      details.scrollTop = 0;
    }

    setDescription("");

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`)
      .then((response) => response.json())
      .then((data) => {
        const entry = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en",
        );

        setDescription(
          entry.flavor_text
            .replace(/\f/g, " ")
            .replace(/\n/g, " ")
            .replace(/\r/g, " "),
        );
      });
  }, [selectedPokemon]);

  return (
    <div className="pokedex-modal">
      <div className="pokedex-header">
        <h2>POKÉDEX</h2>

        <button
          className="pokedex-close"
          onClick={() => {
            playCloseSound();
            onClose();
          }}
        >
          CLOSE
        </button>
      </div>
      <div className="pokedex-content">
        {loading && (
    <div
        className="pokedex-loading"
        style={{
            backgroundImage: `url(${pokedexLoadingBg})`,
        }}
    >
        <div className="loading-pokeball">
            <div className="loading-pokeball-button"></div>
        </div>

        <p>LOADING POKÉDEX{loadingDots}</p>
    </div>
)}

      {selectedPokemon === null ? (
        <div className="pokedex-search-row">
          <input
            className="pokedex-search"
            type="text"
            placeholder="SEARCH POKÉMON..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      ) : (
        <div className="pokedex-search-row">
          <button
            className="pokedex-back"
            onClick={() => {
              playClickSound();
              setSelectedPokemon(null);
            }}
          >
            BACK
          </button>
        </div>
      )}

      {selectedPokemon === null ? (
        <div className="pokedex-list">
          {pokemonList
            .filter(
              (pokemon) =>
                pokemon.name.includes(search.toLowerCase()) ||
                String(pokemon.id).includes(search),
            )
            .map((pokemon) => (
              <div
                className="pokedex-entry"
                key={pokemon.name}
                onClick={() => {
                  playClickSound();
                  setSelectedPokemon(pokemon);
                }}
              >
                <div className="pokedex-entry-header">
                  <span>#{pokemon.id}</span>

                  <span className="pokedex-name">
                    {pokemon.name}
                    <span className="caught-ball" aria-label="Caught"></span>
                  </span>
                </div>

                <div className="pokedex-entry-body">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />

                  <div className="pokedex-entry-info">
                    <p className="pokemon-species">{pokemon.species}</p>

                    <p className="pokemon-types">
                      {pokemon.types
                        .map((type) => formatName(type.type.name))
                        .join(" / ")}
                    </p>

                    <p>HT: {(pokemon.height / 10).toFixed(1)} m</p>

                    <p>WT: {(pokemon.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="pokedex-details">
          <div className="pokedex-top">
            <div className="pokedex-sprite">
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
            </div>

            <div className="pokedex-info">
              <h2>
                #{String(selectedPokemon.id).padStart(3, "0")}{" "}
                {formatName(selectedPokemon.name)}
              </h2>

              <p>Species: {selectedPokemon.species}</p>

              <p>
                Type:{" "}
                {selectedPokemon.types
                  .map((type) => formatName(type.type.name))
                  .join(" / ")}
              </p>

              <p>Height: {(selectedPokemon.height / 10).toFixed(1)} m</p>

              <p>Weight: {(selectedPokemon.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>
          <h3>BASE STATS</h3>

          <div className="stats">
            {selectedPokemon.stats.map((stat) => (
              <div className="stat-row" key={stat.stat.name}>
                <span>{stat.stat.name}</span>

                <div className="stat-bar">
                  <div
                    className={`stat-fill stat-${stat.stat.name}`}
                    style={{
                      width: `${(stat.base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </div>

                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>

          <h3>ABILITIES</h3>

          <div className="abilities">
            {selectedPokemon.abilities.map((ability) => (
              <p key={ability.ability.name}>
                {formatName(ability.ability.name)}
              </p>
            ))}
          </div>

          <h3>POKÉDEX ENTRY</h3>

          <p className="pokedex-description">{description}</p>
        </div>
      )} </div>
    </div>
  );
}

export default PokedexModal;

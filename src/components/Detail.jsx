import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pokemons from "./datos";

function Detail() {
  const [pokemons, setPokemons] = useState([]);
  const [prevPokemon, setPrevPokemon] = useState("");
  const [nextPokemon, setNextPokemon] = useState("");
  const { name } = useParams();
  const cardPokemon = Pokemons.filter((e) => {
    return e.name.toLowerCase() == name;
  });
  console.log(cardPokemon);
  const pokemonIndex = Pokemons.findIndex((e) => {
    return e.name.toLowerCase() == name;
  });

  // useEffect(() => {
  //   fetch("http://localhost:3000/Pokemons", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPokemons(data);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, []);

  useEffect(() => {
    if (Pokemons.length) {
      if (pokemonIndex - 1 !== -1) {
        setPrevPokemon(
          `/detail/${Pokemons[pokemonIndex - 1].name.toLocaleLowerCase()}`
        );
      } else {
        setPrevPokemon(`/detail/aron`);
      }
    }
  }, [pokemonIndex]);

  useEffect(() => {
    if (Pokemons.length) {
      if (pokemonIndex + 1 < Pokemons.length) {
        setNextPokemon(
          `/detail/${Pokemons[pokemonIndex + 1].name.toLocaleLowerCase()}`
        );
      } else {
        setNextPokemon(`/detail/bulbasaur`);
      }
    }
  }, [pokemonIndex]);

  const ProgressClass = ({ value }) => {
    return (
      <progress
        className={cardPokemon[0]?.type[0] + "progress progress"}
        id="file"
        max="200"
        value={value}
      ></progress>
    );
  };
  return (
    cardPokemon.length && (
      <div className={cardPokemon[0]?.type[0] + " detailFather"}>
        <img
          className="pokeballImgContainer"
          src="/images/Pokeball.png"
          alt="Pokeball"
        />

        <header className="headerDetail">
          <div className="arrowAndNameContainer">
            <div>
              <Link to={"/"}>
                <h1>←</h1>
              </Link>
            </div>
            <h1>{cardPokemon.length && cardPokemon[0]?.name}</h1>
          </div>

          <div>{cardPokemon[0]?.id}</div>
        </header>
        <div className="imagePokemonContainer">
          <Link to={prevPokemon}>
            <img
              className="leftFrame"
              src="/images/Frame.svg"
              alt="prevPokemon"
            />
          </Link>
          <img
            className="pokemonImg"
            src={cardPokemon[0]?.image}
            alt={cardPokemon[0]?.name}
          />
          <Link to={nextPokemon}>
            <img src="/images/Frame.svg" alt="nextPokemon" />
          </Link>
        </div>
        <main className="mainDetail">
          <div className="buttonContainer">
            <button className={cardPokemon[0]?.type[0]}>
              {cardPokemon[0]?.type[0]}
            </button>
            {cardPokemon[0]?.type[2] && (
              <button className={cardPokemon[0]?.type[2]}>
                {cardPokemon[0]?.type[2]}
              </button>
            )}
          </div>
          <h3 className="aboutBaseStats">About</h3>
          <div className="atributesContainer">
            <div className="informationContainer">
              <div className="iconAndValueMainContainer">
                <div>
                  <img src="/images/Weight.svg" alt="Weight" />
                </div>
                <p>{cardPokemon[0]?.weight}</p>
              </div>
              <p className="weight">Weight</p>
            </div>
            <div className="informationContainer heightContainer">
              <div className="iconAndValueMainContainer">
                <div>
                  <img src="/images/Height.svg" alt="Height" />
                </div>
                <p>{cardPokemon[0]?.height}</p>
              </div>
              <p className="weight">Height</p>
            </div>
            <div className="informationContainer">
              <div className="iconAndValueMainContainer">
                <p className="moves">
                  {cardPokemon[0]?.moves[0]} <br /> {cardPokemon[0]?.moves[1]}
                </p>
              </div>
              <p className="weight">Moves</p>
            </div>
          </div>
          <p className="description">{cardPokemon[0]?.description}</p>
          <h3 className="aboutBaseStats">Base Stats</h3>
          <div className="baseStatsContainer">
            <div className="nameStatsContainer">
              <h3>HP</h3>
              <h3>ATK</h3>
              <h3>DEF</h3>
              <h3>SATK</h3>
              <h3>SDEF</h3>
              <h3>SPD</h3>
            </div>
            <div className="numberStatsContainer">
              <h3>{cardPokemon[0]?.stats.hp}</h3>
              <h3>{cardPokemon[0]?.stats.atk}</h3>
              <h3>{cardPokemon[0]?.stats.def}</h3>
              <h3>{cardPokemon[0]?.stats.satk}</h3>
              <h3>{cardPokemon[0]?.stats.sdef}</h3>
              <h3>{cardPokemon[0]?.stats.spd}</h3>
            </div>
            <div className="progressContainer">
              {cardPokemon.length &&
                Object.keys(cardPokemon[0].stats).map((stat) => {
                  return <ProgressClass value={cardPokemon[0]?.stats[stat]} />;
                })}
            </div>
          </div>
        </main>
      </div>
    )
  );
}

export default Detail;

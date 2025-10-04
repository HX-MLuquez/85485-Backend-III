//* API de Star Wars: https://akabab.github.io/starwars-api/api/all.json

const characters = [
  {
    id: 1,
    name: "Luke Skywalker",
    homeworld: "tatooine",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
    species: "human",
  },
  {
    id: 2,
    name: "C-3PO",
    homeworld: "tatooine",
    species: "droid",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png",
  },
  {
    id: 3,
    name: "R2-D2",
    homeworld: "naboo",
    species: "droid",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png",
  },
  {
    id: 4,
    name: "Darth Vader",
    homeworld: "tatooine",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg",
  },
  {
    id: 5,
    name: "Leia Organa",
    homeworld: "alderaan",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png",
  },
  {
    id: 6,
    name: "Owen Lars",
    homeworld: "tatooine",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png",
  },
  {
    id: 7,
    name: "Beru Whitesun lars",
    homeworld: "tatooine",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png",
  },
  {
    id: 8,
    name: "R5-D4",
    homeworld: "tatooine",
    species: "droid",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png",
  },
  {
    id: 9,
    name: "Biggs Darklighter",
    homeworld: "tatooine",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png",
  },
  {
    id: 10,
    name: "Obi-Wan Kenobi",
    homeworld: "stephos",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg",
  },
  {
    id: 11,
    name: "Anakin Skywalker",
    homeworld: "tatooine",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png",
  },
  {
    id: 12,
    name: "Wilhuff Tarkin",
    homeworld: "eclipse",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg",
  },
  {
    id: 13,
    name: "Chewbacca",
    homeworld: "kashyyyk",
    species: "wookiee",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png",
  },
  {
    id: 14,
    name: "Han Solo",
    homeworld: "corellia",
    species: "human",
    image:
      "https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png",
  },
];

//* img por default https://upload.wikimedia.org/wikipedia/commons/e/ea/Star_Wars_Identities_%288348847356%29.jpg

export default class CharactersManager {
  constructor() {
    this.characters = characters;
  }

  getCharacters() {
    return this.characters;
  }

  createCharacter(character = {}) {
    this.characters.push(character);
    return character;
  }
}

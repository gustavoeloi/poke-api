const pokeApi = {};

const convertPokeApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();

  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

  pokemon.types = types;
  pokemon.type = types[0];

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const apiURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(apiURL)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => {
      console.log(pokemonsDetails);
      return pokemonsDetails;
    });
};

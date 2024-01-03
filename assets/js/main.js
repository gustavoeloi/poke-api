const pokemonOLHtml = document.getElementById("pokemonList");
const btnShowMore = document.getElementById("showMore");
const btnShowLess = document.getElementById("showLess");

const maxRecords = 151;
const limit = 10;
let offset = 0;

const loadPokemonItens = (offset, limit) => {
  const convertPokemonToLi = (pokemon) => {
    return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
  
      <div class="detail ${pokemon.type}">
        <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
        </ol>
  
        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
      </div>
    </li>
    `;
  };

  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    pokemonOLHtml.innerHTML += pokemons.map(convertPokemonToLi).join("");
  });
};

loadPokemonItens(offset, limit);

btnShowMore.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    btnShowMore.parentElement.removeChild(btnShowMore);
  } else {
    loadPokemonItens(offset, limit);
  }
});

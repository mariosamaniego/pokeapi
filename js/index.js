const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
    //console.log(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

    let uri;

    if(pokemon.id < 100 && pokemon.id > 9)
    {
        uri = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${
            pokemon.id
        }.png" alt="${name}" `
    }

    if(pokemon.id < 10)
    {
        uri = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${
            pokemon.id
        }.png" alt="${name}"`
    }

    if(pokemon.id >= 100)
    {

        uri = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
            pokemon.id
        }.png" alt="${name}"`
    }

    let pokemonAbilities = Object.keys(pokemon.abilities).length;

    for (let i = 0; i <= pokemonAbilities - 1; i++) {
      if (i == 0) {
        ability = `${pokemon.abilities[i].ability.name}`;
      }
      if (i == 1) {
        ability = `${ability}<br><br>${pokemon.abilities[i].ability.name}`;
      }
      if (i == 2) {
        ability = `${ability}<br><br>${pokemon.abilities[i].ability.name}`;
      }
    }

    let peso = parseFloat(pokemon.weight / 10);
    let altura = parseFloat(pokemon.height / 10);
   

    const pokeInnerHTML = `
    <div class="pokemon_content">
        <div class="img-container" loading="lazy">
            <img src="${uri}" />
    </div>
    

    <div class="info">
        <span class="number">#${pokemon.id
                    .toString()
                    .padStart(3, '0')}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    </div>

    <div class="habilities">
    <p><b>  abilitys: </b></p>
    <p>${ability}</p>
        <p> <b> weight:</b> ${peso} Kg</p>
        <p> <b> height :</b> ${altura} m</p>
    </div>
    `;

	

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();






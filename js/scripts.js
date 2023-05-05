let pokemonRepository = (function(){
    let pokemonList=[
        {name: "Turtwig", height: 0.4, type:"Grass"},
        {name: "Umbreon", height: 1, type: "Dark"},
        {name: "Gengar", height: 1.5, type: "Ghost, Poison"},
    ];
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    function showDetails (pokemon){
        console.log(pokemon);
    }
    //Following modifies pokemon repository and turns the array into interacable buttons. While also modifying how they look through the css file.
    function addListItem(pokemon){
        let pokemons = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('ul');
        let button = document.createElement('button');
        button.innerText = pokemon.name, pokemon;
        button.classList.add('button-class');
        button.value = pokemon.name;
        listPokemon.appendChild(button);
        pokemons.appendChild(listPokemon);
        button.addEventListener('click', function(event){
            showDetails(pokemon.name)
        });
    }
    return{
        add: add,
        getAll:  getAll,
        addListItem: addListItem
    }
})();
pokemonRepository.add({ name: "Pikachu", height: 0.3, type: "Electric"});
pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon)
});
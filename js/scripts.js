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
        //added two elements so styles.css has a reference point and can edit the looks
        let listPokemon = document.createElement('ul');
        let button = document.createElement('button');
        //added innerText to display correct information on the button
        button.innerText = pokemon.name, pokemon;
        button.classList.add('button-class');
        //add button to list and pokemons to .pokemon-list
        listPokemon.appendChild(button);
        pokemons.appendChild(listPokemon);
        addListener(button, pokemon)
    }
    //added function to be called when needed in other functions
    function addListener(button, pokemon){
        button.addEventListener('click', function(event){
            showDetails(pokemon.name)
        })
    };
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
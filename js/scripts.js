let pokemonRepository = (function(){
    let pokemonList=[];
    //url for the pokemon api where information will be pulled from
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
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
    //function added to fetch the api and what information to pull
    function loadList(){
        return fetch(apiUrl).then(function (response){
            return response.json();
        })
        .then(function(json){
            json.results.forEach(function (item){
            let pokemon={
                name: item.name,
                detailsUrl: item.url,               
               };
            add(pokemon);
        });
        })
        .catch(function(e){
            console.error(e);
        })
    }
    //function to load the specific information from the api for the pokemon clicked on. 
    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        })
        .then(function(details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
                for (i = 0; i < types.length; i++) {
                    types.name.forEach();
                }                     
        })
        .catch(function (e){
            console.error(e);
        });
    }
    //added function to be called when needed in other functions
    function addListener(button, pokemon){
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        })
    };
    function showDetails (item){
        pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
        });
    }
    return{
        add: add,
        getAll:  getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    }
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

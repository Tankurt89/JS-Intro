let pokemonRepository = (function(){
    let pokemonList=[];
    //url for the pokemon api where information will be pulled from
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log("pokemon is not correct")
        }
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
        listPokemon.classList.add('list-group-item');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', '#myModal');
        button.setAttribute('data-target', '#myModal');

        button.addEventListener('click', function(event){
            showModal(pokemon);
        });

        listPokemon.appendChild(button);
        pokemons.appendChild(listPokemon);
    }
    //function added to fetch the api and what information to pull
    function loadList(){
        showLoadingMessage('Your Pokeomon will be displayed shortly.');
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
            hideLoadingMessage();
        });
        })
        .catch(function(e){
            console.error(e);
            hideLoadingMessage();
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
            item.types=[]            
            showModal(item);
        })
        .catch(function (e){
            console.error(e);
        });
    }
    function showLoadingMessage(text){
        let warning = document.querySelector('.warning');
            warning.innerHTML = '<p>'+ text +'</p>';
    }
    function hideLoadingMessage(){
        let hide = document.querySelector('.warning');
        hide.innerHTML = '';
    }
    function showDetails (item){
        loadDetails(item);
        }
    function showModal(pokemon){
        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = pokemon.name;
        let pokemonHeight = document.querySelector('.modal-footer');
        pokemonHeight.innerHTML = "Height: " + pokemonHeight + "M";
    }
    // searchInput.addEventListener('input', function(event){
    //     pokemonRepository.filterSearch(searchInput);
    // });
    function filterSearch(searchInput){
        let filterValue = searchInput.value.toLowerCase();
        let filteredPokemon = pokemonList.filter(function(pokemon){
            return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
        });
    let pokemonListElement = document.querySelector('.pokmeon-list');
    pokemonListElement.innerHTML = "";
    filteredPokemon.forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
}
    return{
        add: add,
        getAll:  getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        filterSearch: filterSearch,
    };
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

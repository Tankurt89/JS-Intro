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
        // pokemonList.push(pokemon);
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
        showLoadingMessage('Your Pokeomon will be displayed shortly.')
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
            // used to display the item types and item type url
            item.types=[]
            for(i = 0; i < details.types.length; i++){
                // keeps from creating an extra undefined array
                item.types[details.types[i].slot-1]=details.types[i].type;
            }               
        })
        .catch(function (e){
            console.error(e);
        });
    }
    function showLoadingMessage(text){
        let warning = document.querySelector('.warning');
            warning.innerHTML = '<p>'+ text +'</p>'
    }
    function hideLoadingMessage(){
        let hide = document.querySelector('.warning');
        hide.innerHTML = ''
    }
    //added function to be called when needed in other functions
    function addListener(button, pokemon){
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        })
    };
    function showDetails (item){
        loadDetails(item).then(function(){
            showModal(item);
        });
    }
    //start of the modal, made sure to select the id assigned to the div in the html.
    let modalContainer = document.querySelector('#modal-container');
    function showModal(item){
        //calls back to the loadDetails(item) so we can apply the api directly to each item we want to display
        loadDetails(item).then(function(){
        modalContainer.innerHTML='';
        // setting up the div that we will be using
        let modal=document.createElement('div');
        modal.classList.add('modal');
        //creating the close button inside the modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', hideModal);
        //assigning and creating all the elements we want and display
        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name;

        let contentElement = document.createElement('p');
        contentElement.innerText= "Height:" + item.height;

        let imageElement = document.createElement("img");
        imageElement.src = item.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
        });
    };    
    function hideModal(){
        modalContainer.classList.remove('is-visible');
    }
    
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer){
            hideModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });

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

let pokemonRepository = (function(){
    let pokemonList=[
        {name: "Turtwig", height: 0.4, type:["Grass"]},
        {name: "Umbreon", height: 1, type: ["Dark"]},
        {name: "Gengar", height: 1.5, type: ["Ghost", "Poison"]}
    ];
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    return{
        add: add,
        getAll:  getAll
    };
})();
pokemonRepository.add({ name: "Pikachu"});
pokemonRepository.getAll().forEach(function (pokemon){
    console.log(pokemon)
});

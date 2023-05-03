let pokemonList=[
    {name: "Turtwig", height: 0.4, type:["Grass"]},
    {name: "Umbreon", height: 1, type: ["Dark"]},
    {name: "Gengar", height: 1.5, type: ["Ghost", "Poison"]}
];
for (let i=0; i <pokemonList.length; i++){
    //using to assignn any Pokemon larger than 1 the Wow, that is big text.
    if (pokemonList[i].height > 1){
        document.write(pokemonList[i].name + " " + "(Height: " + pokemonList[i].height + ") - Wow, that is big! <br>")
    }
    else{
        document.write(pokemonList[i].name + " " + "(Height: " + pokemonList[i].height + ") <br>");
    }
}
console.log(pokemonList);


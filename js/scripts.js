let pokemonList=[
    {name: "Turtwig", height: "(Height: 0.4)", type:"[Grass]"},
    {name: "Umbreon", height: "(Height: 1)", type: "[Dark]"},
    {name: "Gengar", height: "(Height: 1.5)", type: "[Ghost, Poison]"},
]
let text="";
let i=0; i < pokemonList.length;
for (;pokemonList[i];){
    text = text + " " + pokemonList[i].name + " " + pokemonList[i].height + " " + pokemonList[i].type + "<br>";
    i++;
}   
console.log(text);
document.write(text)
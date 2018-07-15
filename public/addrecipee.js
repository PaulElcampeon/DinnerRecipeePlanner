
document.getElementById("addIngredient").addEventListener("click",()=>{
    addIngredients();
})


function addIngredients(){
    let form = document.getElementById("recipeeForm");
    let h1Ingredient = document.createElement("h1");
    let inputIngredient = document.createElement("input");
    let h1Time = document.createElement("h1");
    let inputTime = document.createElement("input");

    h1Ingredient.innerHTML = "Ingredient 3"
    inputIngredient.type = "text";
    inputIngredient.name = "ingredient3"
    h1Time.innerHTML = "Time to Cook in minutes"
    inputTime.type = "number";
    inputTime.name = "time3"

    form.appendChild(h1Ingredient);
    form.appendChild(inputIngredient);
    form.appendChild(h1Time);
    form.appendChild(inputTime);
}
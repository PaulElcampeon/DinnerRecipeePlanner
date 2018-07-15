var tracking = false;

document.getElementById("trackBtn").addEventListener("click",()=>{
    if(tracking == false){
        tracking = true;
        alert("Tracking has been turned on");
    }else{
        alert("Tracking is already turned on");
    }
})


document.getElementById("trackSub").addEventListener("click",()=>{
    getRecipee();
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////FUNCTION TO GET RECIPEE FROM SERVER//////////////////////////////////////////////////
function getRecipee(){
    if(tracking == true){
        tracking = false;
        alert("Tracking has been turned off");
    }
    
    let action = document.getElementById("trackingForm").action;
    let queryKey = document.getElementById("titleSub").name;
    let queryValue = document.getElementById("titleSub").value;

    fetch(action+"/?"+queryKey+"="+queryValue, {method: 'POST'}).then(function (response) {
        response.json().then(function (json){
            displayRecipee(json);
        });
    }).catch(function (err) {console.error(err)});

}

var MealDateAndTime;
var Ingredient1DateAndTime;
var Ingredient2DateAndTime;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////FUNCTION TO DISPLAY RECIPEE DETAILS TO SCREEN/////////////////////////////////////////// 
function displayRecipee(data){
    MealDateAndTime =  new Date(new Date(data.date)-60000*60);
    Ingredient1DateAndTime = new Date(new Date(data.time1)-60000*60);
    Ingredient2DateAndTime = new Date(new Date(data.time2)-60000*60);

    document.getElementById("recipeeHolder").innerHTML ="";
    let recipeeContainer = document.getElementById("recipeeHolder");
    let title = document.createElement("p");
    let date = document.createElement("p");
    let ingredient1andTime = document.createElement("p");
    let ingredient2andTime = document.createElement("p");

    title.innerHTML = "Title: "+data.title;
    date.innerHTML = "Date of meal: "+splitDateTime(data.date).date+" <br>Time of meal: "+splitDateTime(data.date).time;
    ingredient1andTime.innerHTML = "Ingredient 1: "+data.ingredient1+"  <br>Start cooking at: "+splitDateTime(data.time1).time;
    ingredient2andTime.innerHTML = "Ingredient 2: "+data.ingredient2+"  <br>Start cooking at: "+splitDateTime(data.time2).time;

    recipeeContainer.appendChild(title);
    recipeeContainer.appendChild(date);
    recipeeContainer.appendChild(ingredient1andTime);
    recipeeContainer.appendChild(ingredient2andTime);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////FUNCTION TO SEPERATE DATE AND TIME FROM DATE OBJECT/////////////////////////////////////////// 
function splitDateTime(date){
    let dateAndTime = date.split("T");
    let datePart = dateAndTime
    let timePart = datePart[1].split(".")
    return {"date":datePart[0],"time":timePart[0]}
}

var ingr1 = false
var ingr2 = false
var MDT = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////FUNCTION TO CHECK WHEN TO START COOKING INGREDIENTS/////////////////////////////////////////// 
function checkingTime(){
    if(tracking == true){
        if(Ingredient1DateAndTime <= new Date() && ingr1 == false){
            ingr1 = confirm("We need to start cooking ingredient 1");
        }
        if(Ingredient2DateAndTime <= new Date() && ingr2 == false){
            ingr2 = confirm("We need to start cooking ingredient 2");
        }
        if(MealDateAndTime <= new Date() && MDT == false){
            MDT = confirm("We need to fuking eat now!");
        }
    }
    console.log(new Date());
    console.log("Cook ingredeint 1 at"+Ingredient1DateAndTime);
    console.log("Cook ingredeint 2 at "+Ingredient2DateAndTime);
    console.log("Meal Time is at "+MealDateAndTime);


}

setInterval(checkingTime,5000);
const fs = require("fs");
const express = require("express");
const app = express();
const formidable = require('express-formidable');
app.use(express.static("public"));
app.use(formidable());

var Recipee = require("./models/Recipee");

app.listen(3000,()=>{
    console.log("Waiting on requests from port 3000");
})

app.get("/",(request,response)=>{
    response.status(200).sendFile("index.html",{root: __dirname+"/public"});
})


app.post("/recipee",(request,response)=>{
    let title = request.fields.Title;
    let ingredient1 = request.fields.Ingredient1;
    let time1 = request.fields.time1;
    let ingredient2 = request.fields.Ingredient2;
    let time2 = request.fields.time2;
    let mealDate = request.fields.mealdate;
    let mealTime = request.fields.mealTime;
    console.log(time1)
    console.log(time2)
    console.log(mealDate+"T"+mealTime)

    let recipeeHolder = new Recipee(title,ingredient1,time1,ingredient2,time2,mealDate,mealTime);
    console.log(recipeeHolder)
    let recipeeFileJSON = fs.readFileSync("./data/recipee.json", "utf-8");
    let recipeeFileParsed = JSON.parse(recipeeFileJSON);
    recipeeFileParsed.recipees.push(recipeeHolder);
    let stringifiedFile = JSON.stringify(recipeeFileParsed,null,4);
    fs.writeFileSync("./data/recipee.json", stringifiedFile,"utf-8");
    response.status(201).redirect("/");
})

app.post("/track",(request,response)=>{
    // console.log(request.query);
    let title = request.query.title;
    let recipeeFileJSON = fs.readFileSync("./data/recipee.json", "utf-8");
    let recipeeFileParsed = JSON.parse(recipeeFileJSON);
    
    let recipeeHolder = recipeeFileParsed.recipees.filter((object)=>{
        if(object.title === title){
            return object;
        }
    })
 
    response.status(201).json(recipeeHolder[0]).end();
})


class Recipee{
    constructor(title,ingredient1,time1,ingredient2,time2,mealDate,mealTime){
        var add_minutes =  (dt, minutes)=> {
            return new Date(dt.getTime() + minutes*60000);
        }
        this.title = title;
        this.date = add_minutes(new Date(mealDate+"T"+mealTime),60)
        this.ingredient1 = ingredient1;
        this.time1 = new Date(this.date-time1*60000)
        this.ingredient2 = ingredient2;
        this.time2 = new Date(this.date-time2*60000)
    }

}

module.exports = Recipee
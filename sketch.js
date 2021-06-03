
 var dog, database,foodS,foodStock,fedTime,lastFed,feed,addFood,foodObj;
 var dogName;
 //var M = 1;
 
 
 function preload(){
 sadDog=loadImage("Dog.png");
 happyDog=loadImage("happy dog.png");
 }
 
 function setup() {
   database=firebase.database();
   createCanvas(1000,500);
   foodObj= new Food();
   foodStock=database.ref('Food');
   foodStock.on("value",readStock);
  
   
   
 
  
   
   
   dog=createSprite(800,200,150,150);
   dog.addImage(sadDog);
   dog.scale=0.15;
   
   feed=createButton("Feed the Dog");
   feed.position(1000,95);
   feed.mousePressed(feedDog);
 
   addFood=createButton("Add Milk");
   addFood.position(1100,95);
   addFood.mousePressed(addFoods);
 
 }
 
 function draw() {
   background(46,139,87);
   foodObj.display();
   fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
     lastFed=data.val();
   })
  
  
  textSize(50)
  fill (255,255)
    
   

   if(lastFed>=12){ 
     text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
    }
    else if(lastFed==0){ 
      text("Last Feed : 12 AM",350,30);
     }
     else{ 
       text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   
   drawSprites();
 }

 
 //function to read food Stock
 function readStock(data){
   foodS=data.val();
   foodObj.updateFoodStock(foodS);
 }
 
 
 //function to update food stock and last fed time
 function feedDog(){
   dog.addImage(happyDog);
  var food_stock_val=foodObj.getFoodStock();

  if (food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
 
 
 //function to add food in stock
 database.ref('/').update({ 
   Food:foodObj.getFoodStock(), 
  FeedTime:hour() 
})
 }

 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 
}
 
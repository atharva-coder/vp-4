var database;
var dog,sadDog
var bedroom, vaccination, foodstock, Garden, lazy, livingroom, washroom
var dogImg, happyDogImg, deadDogImg, vaccinatedDogImg, dogRunningImg, dogRunningLeftSideImg, lazyDogImg;
var bedRoomImg, gardenImg, livingRoomImg, washRoomImg;
var foodStockImg, milkImg;
var injectionImg, vaccinationChartImg;
var foodS = 20;
var lastFed = 0;
var foodObj = null;
var feedButton, addButton, deadButton, vaccinatedDogButton, bedRoomButton, vaccinationChartButton, foodStockButton, gardenButton, lazyDogButton, livingRoomButton, runningDogButton, runningDogLeftSideButton, vaccinateButton, washRoomButton, homeButton;
var gameState

function preload()
{
  backgroundImg = loadImage("images/bg.png");
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
  deadDogImg = loadImage("images/deadDog.png");
  vaccinatedDogImg = loadImage("images/Vaccination.jpg");
  bedRoomImg = loadImage("images/BedRoom.png");
  vaccinationChartImg = loadImage("images/dogVaccination.png");
  foodStockImg = loadImage("images/FoodStock.png");
  gardenImg = loadImage("images/Garden.png");
  lazyDogImg = loadImage("images/Lazy.png");
  livingRoomImg = loadImage("images/LivingRoom.png");
  dogRunningImg = loadImage("images/running.png");
  dogRunningLeftSideImg = loadImage("images/runningLeft.png");
  washRoomImg = loadImage("images/WashRoom.png");
  sadDog = loadImage("images/sadDog.png")

}


function setup(){

  createCanvas(800, 700);

  foodObj = new Food();

  dog = createSprite(650, 140);
  dog.scale = 0.3;
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDogImg);
  dog.addImage("dog3", deadDogImg);
  dog.addImage("dog4", vaccinatedDogImg);
  dog.addImage("dog5", lazyDogImg);
  dog.addImage("dog6", dogRunningImg);
  dog.addImage("dog7", dogRunningLeftSideImg);
  dog.addImage("dog8", sadDog)

  feedButton = createButton("FEED DOG");
  feedButton.position(500, 720);
  feedButton.mousePressed(feedDog);

  addButton = createButton("ADD BOTTLES");
  addButton.position(1000, 720);
  addButton.mousePressed(addFood);

  deadButton = createButton("DEAD DOG");
  deadButton.position(670, 720);
  deadButton.mousePressed(deadDog);

  vaccinatedDogButton = createButton("VACCINATE THE DOG");
  vaccinatedDogButton.position(660, 620);
  vaccinatedDogButton.mousePressed(vaccinatedDog);

  bedRoomButton = createButton("I AM VERY SLEEPY");
  bedRoomButton.position(670, 670);
  bedRoomButton.mousePressed(bedRoom);

  vaccinationChartButton = createButton("SEE VACCINATION CHART");
  vaccinationChartButton.position(960, 620);
  vaccinationChartButton.mousePressed(vaccinationChart);

  foodStockButton = createButton("^");
  foodStockButton.position(360, 720);
  foodStockButton.mousePressed(foodStock);
  
  gardenButton = createButton("LET'S PLAY");
  gardenButton.position(360, 670);
  gardenButton.mousePressed(garden);
  
  lazyDogButton = createButton("LAZY DOG");
  lazyDogButton.position(830, 720);
  lazyDogButton.mousePressed(lazyDog);

  livingRoomButton = createButton("GO TO LIVING ROOM");
  livingRoomButton.position(830, 670);
  livingRoomButton.mousePressed(livingRoom);

  runningDogButton = createButton("DOG RUNNInG RIGHT");
  runningDogButton.position(360, 620);
  runningDogButton.mousePressed(runRight);

  runningDogLeftSideButton = createButton("DOG RUNNING LEFT");
  runningDogLeftSideButton.position(1000, 670);
  runningDogLeftSideButton.mousePressed(runLeft);

  washRoomButton = createButton("I WANT TO TAKE BATH");
  washRoomButton.position(500, 670);
  washRoomButton.mousePressed(washRoom);

}


function draw() {  

  background(46, 139, 87);

  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed (approx timing) : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed (approx timing) : 12 AM",350,30);
   }else{
     text("Last Fed (approx timing) : "+ lastFed + " AM", 350,30);
   }

  foodObj.display();
  //writeStock();

  if(foodS == 0){
    dog.changeImage("dog8", sadDog);
    dog.scale = 0.6;
  }

  if(gameState === 1){
    dog.changeImage("dog2", happyDogImg);
  }

  if(gameState === 2){
    dog.changeImage("dog8", sadDog);
  }

  if(gameState === 3){
    wash = createSprite(400,400,800,800);
    wash.addImage("wash", washRoomImg);
    wash.scale = 1.6;
  }

  if(gameState === 4){
   bedroom = createSprite(400,400,800,800);
   bedroom.addImage("bedroom", bedRoomImg);
   bedroom.scale = 1.6;
   
  }

  if(gameState === 5){
   Garden = createSprite(400,400,800,800);
   Garden.addImage("garden", gardenImg);
   Garden.scale = 1.6;
   
  }

  drawSprites();

}

function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  if(foodS > 0){
    dog.changeAnimation("dog2", happyDogImg);
    dog.scale = 0.3
    foodS--;
    foodObj.updateFoodStock(foodS);
    lastFed = hour();
    foodObj.updateLastFed(lastFed);
  }
}

function deadDog(){
  dog.changeAnimation("dog3", deadDogImg);
  dog.scale = 0.3
}

function vaccinatedDog(){
  dog.changeAnimation("dog4", vaccinatedDogImg);
  dog.scale = 0.5;
}

function bedRoom(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState})
}

function vaccinationChart(){
  vaccination = createSprite(610,405,50,50);
  vaccination.addImage("vaccination", vaccinationChartImg);
  vaccination.scale = 0.4
}

function foodStock(){
  foodstock = createSprite(70,490,10,10);
  foodstock.addImage("foodstock", foodStockImg);
  foodstock.scale = 0.2
}

function garden(){
  Garden = createSprite(400,400,800,800);
  Garden.addImage("garden", gardenImg);
  Garden.scale = 1.6;
  gameState = 5;
  database.ref('/').update({'gameState':gameState});
}

function lazyDog(){
  dog.changeAnimation("dog5", lazyDogImg);
  dog.scale = 0.4;
}

function livingRoom(){
  livingroom = createSprite(400,400,800,800);
  livingroom.addImage("living", livingRoomImg);
  livingroom.scale = 1.6;
}

function runRight(){
  dog.changeAnimation("dog6", dogRunningImg);
  dog.scale = 0.3;
}

function runLeft(){
  dog.changeAnimation("dog7", dogRunningLeftSideImg);
  dog.scale = 0.3;
}

function washRoom(){
  gameState = 3
  database.ref('/').update({'gameState':gameState});
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({food:x});
}
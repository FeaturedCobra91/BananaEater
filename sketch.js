var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var surTime=0;
var score=0;


var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);

  monkey = createSprite(100, 340);
  monkey.addAnimation("runnermonkey", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(400, 450, 900, 100);
  ground.velocityX = -8;
  ground.shapeColor = "brown";

  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("circle", 1, 10, 270);
  monkey.debug = false;

}


function draw() {

  background("green");

  if (gameState === PLAY) {

    if (ground.x < 500) {
      ground.x = 240;

    }

    if (keyDown("space") && monkey.y > 335) {
      monkey.velocityY = -21;

    }
    
    if (monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score=score+1;
      
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    obstacles();
    bananas();

    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;

    }

  } else if (gameState === END) {
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    monkey.visible=false;
    ground.velocityX = 0;
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    textSize(30);
    stroke("red");
    text("GAMEOVER Press R to restart", 50, 220);
    
    if (keyDown("R")){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      foodGroup.destroyEach();
      score=0;
      monkey.visible=true;
      
    }

  }

  // console.log(gameState);

  monkey.collide(ground);

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 50,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  surTime = Math.ceil(frameCount/frameRate());
  text("Your Survival Time is " + surTime + " seconds",150,50);
}

function obstacles() {

  if (frameCount % 200 === 0) {
    obstacle = createSprite(500, 370);
    obstacle.addImage("ob", obstacleImage);
    obstacle.scale = 0.2
    //obstacle.y = Math.round(random(50,400)); 
    obstacle.velocityX = -5;
    obstacle.lifetime = 250;

    ground.depth = obstacle.depth;
    ground.depth = ground.depth + 1;

    obstaclesGroup.add(obstacle);


  }


}


function bananas() {

  if (frameCount % 150 === 0) {
    banana = createSprite(500, 250);
    banana.addImage("bn", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 250;

    foodGroup.add(banana);
  }
}
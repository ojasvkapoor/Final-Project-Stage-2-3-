var bg, bgimg;
var PLAY = 1
var END = 0 
var gameState = PLAY
var coins , coin1 , coin2 , coin3 , coin4 , coin5 , coin6 , coin7  , coins8 ; 
var treasure ,treasureimg , bomb , tnt1 , tnt2 , tnt3  , tnt4 ; 
var bombGroup , treasureGroup , coinsGroup ;
var ninja , ninjarun , ninjajump ; 


function preload(){

bgimg = loadImage("images/bg3.jpg");

coin1 = loadImage("images/coins1.png");
coin2 = loadImage("images/coins2.png");
coin3 = loadImage("images/coins3.png");
coin4 = loadImage("images/coins4.png");
coin5 = loadImage("images/coins5.png");
coin6 = loadImage("images/coins6.png");
coin7 = loadImage("images/coins7.png");
coin8 = loadImage("images/coins8.png");

treasureimg = loadAnimation("images/treasure1.png" , "images/treasure2.png" , "images/treasure3.png" , "images/treasure4.png", "images/treasure5.png", "images/treasure6.png");
ninjarun = loadAnimation("images/ninjaRUN1.png" , "images/ninjaRUN2.png" ,"images/ninjaRUN3.png","images/ninjaRUN4.png","images/ninjaRUN5.png","images/ninjaRUN6.png" );
ninjajump = loadAnimation("images/ninjaJUMP1.png","images/ninjaJUMP2.png","images/ninjaJUMP3.png","images/ninjaJUMP4.png","images/ninjaJUMP5.png","images/ninjaJUMP6.png","images/ninjaJUMP7.png","images/ninjaJUMP8.png")

tnt1 = loadImage("images/tnt1.png")
tnt2 = loadImage("images/tnt2.png")
tnt3 = loadImage("images/tnt3.png")
tnt4 = loadImage("images/tnt4.png")

}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/2,height/2,width,400);
  bg.addImage("ground",bgimg);
  bg.scale= 0.6
  bg.velocityX = -(6 + 3*score/100);
   

  ninja = createSprite(50,height-70,20,50);
  
  
  ninja.addAnimation("running", ninjarun);
  ninja.addAnimation("jump", ninjajump);
  ninja.setCollider('circle',0,0,350)
  ninja.scale = 1.2

  coinsGroup = new Group();
  treasureGroup = new Group();
  bombGroup = new Group();
  score = 0 ;
 
}

function draw() {
 background(0);

 textSize(20);
 fill("black");
 text("Score : " + score , 30 , 50);
  
 if (gameState === PLAY){

  score = score + Math.round(getFrameRate()/60);
  bg.velocityX = -(6 + 3*score/100);

  if((touches.length > 0 || keyDown("SPACE")) && ninja.y  >= height-120) {
    //jumpSound.play( )
    ninja.velocityY = -10;
     touches = [];
  }
  ninja.velocityY = ninja.velocityY + 0.8

  
  if (bg.x < 0){
    bg.x = width/2
  }

  spawnCoins();

 } 
 else if (gameState ===END){
   bg .velocityX = 0;
   ninja.velocityY = 0 ;

 }



  drawSprites();
 
}

function spawnCoins() {
  if(frameCount % 60 === 0) {
    var coins = createSprite(600,height-95,20,30);
    coins.setCollider('circle',0,0,45)
  
    coins.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: coins.addImage(coins1);
              break;
      case 2: coins.addImage(coins2);
              break;
      case 3: coins.addImage(coins3);
              break; 
     case 4: coins.addImage(coins4);
              break;
    case 5: coins.addImage(coins5);
              break;
    case 6: coins.addImage(coins6);
              break;
     case 7: coins.addImage(coins7);
              break;
     case 8: coins.addImage(coins8);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    coins.scale = 0.3;
    coins.lifetime = 300;
    coins.depth = ninja.depth;
    ninja.depth +=1;
    //add each obstacle to the group
    coinsGroup.add(coins);


  }
}

 function spawnBombs(){
   if(frameCount %170 === 0){
     var bomb = createSprite(600 ,height-95 , 25,25);
      bomb.setCollider(circle , 0, 0,45);

    var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(tnt1);
               break;
       case 2: obstacle.addImage(tnt2);
               break;
       case 3: obstacle.addImage(tnt3);
               break;       
       case 4: obstacle.addImage(tnt4);
               break;
       default: break;
     }
     
     //assign scale and lifetime to the obstacle           
     bomb.scale = 0.3;
     bomb.lifetime = 300;
     bomb.depth = ninja.depth;
     ninja.depth +=1;
     //add each obstacle to the group
     bombGroup.add(bomb);
   }
 }
   }
 }


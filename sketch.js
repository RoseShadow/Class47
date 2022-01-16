var bg,bgImg;
var player, shooterImg, shooter_shooting;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombie,zombieImg;
var zombieGroup;

var bullets=30,bulletsGroup,bullet;

var gameState="fight";

function preload(){
  
 bgImg=loadImage("assets/bg.jpeg");
 shooterImg=loadImage("assets/shooter_2.png");
 shooter_shooting=loadImage("assets/shooter_3.png");

 heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  zombieImg=loadImage("assets/zombie.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg= createSprite(windowWidth/2-20,windowHeight/2,20,20);
  bg.addImage(bgImg);
  bg.scale= 1.5;
  

//creating the player sprite
  player= createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg);
  player.scale= 0.5;
  player.debug=true;

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    


  player.setCollider("rectangle",0,0,300,300);

  zombieGroup=new Group();
  bulletsGroup=new Group();
}

function draw() {
  background(0); 

  if(gameState==="fight"){


  //moving the player up and down and making the game mobile compatible using touches
   if(keyDown(UP_ARROW)){
     player.y-= 8
   }
   if(keyDown(DOWN_ARROW)){
    player.y+=  8
  }
   

//release bullets and change the image of shooter to shooting position when space is pressed
   if(keyWentDown("space")){

    bullet= createSprite(displayWidth-1150,player.y-30,20,10);
    bullet.velocityX=20;
    bulletsGroup.add(bullet);

     player.addImage(shooter_shooting);

    bullets=bullets-1;
   }

//player goes back to original standing image once we stop pressing the space bar
    if(keyWentUp("space")){
      player.addImage(shooterImg);
    }

  if(zombieGroup.isTouching(player)){
   // zombieGroup.destroyEach();
   for(var a=0;a<zombieGroup.length;a++){
      if (zombieGroup[a].isTouching(player)){
        zombieGroup[a].destroy();
      }
   }
  }

  if(zombieGroup.isTouching(bulletsGroup)){
    // zombieGroup.destroyEach();
    for(var a=0;a<zombieGroup.length;a++){
       if (zombieGroup[a].isTouching(bulletsGroup)){
         zombieGroup[a].destroy();
         bulletsGroup.destroyEach();
       }
    }
   }
  
 if(bullets===0){
   gameState="bullets";
 }

spawnZombie();

}

drawSprites();

 if(gameState==="lost"){
  textSize(100);
  fill("red");
  text("You Lost",400,400);
  
  zombieGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
}
else if(gameState==="won"){
  textSize(100);
  fill("red");
  text("You Won",400,400);
  
  zombieGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
}
//bullets State= when we are out of bullets
else if(gameState==="bullets"){
  textSize(100);
  fill("red");
  text("Out Of Bullets",400,400);
  
  zombieGroup.destroyEach();
  player.destroy();
 // bulletsGroup.destroyEach();
}



}

function spawnZombie(){

  if(frameCount % 60===0){
    zombie= createSprite(random(700,1100),random(200,500),40,40);
    zombie.addImage(zombieImg);
    zombie.scale=0.15;
    zombie.velocityX=-3;

    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime= 400;

    zombieGroup.add(zombie);
  }
}
var torre, torreImg;
var ventana, ventanaImg;
var descanso, descansoImg;
var fantasma, fantasmaImg;
var invisibleDescanso;
var GameState = "PLAY";
var spookySound;

function preload(){
  torreImg = loadImage ("tower.png");
  ventanaImg = loadImage ("door.png");
  descansoImg = loadImage ("climber.png");
  fantasmaImg = loadImage ("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
}

function setup(){
  createCanvas (600,500);
  
  spookySound.loop();
  torre = createSprite (300,250);
  torre.addImage(torreImg);
  torre.velocityY= 2;
  ventanasGroup = new Group ();
  descansosGroup = new Group ();
  invisibleDescansoGroup = new Group ();
  fantasma = createSprite (200, 200, 50, 50);
  fantasma.addImage(fantasmaImg);
  fantasma.scale= 0.3;
  
}

function draw(){
  background(0);
  
  if(GameState === "PLAY"){
     
    if(keyDown("Space")){
    fantasma.velocityY= -5
  }
  
  if(keyDown("left_arrow")){
     fantasma.x=fantasma.x-3;
     }
  
   if(keyDown("right_arrow")){
     fantasma.x=fantasma.x+3;
     }
    if(torre.y > 600){
     torre.y = 0;
     }
    fantasma.velocityY= fantasma.velocityY+0.8;
    
     
  spawnVentanas();
  drawSprites();
  
  
  if(descansosGroup.isTouching(fantasma)){
    fantasma.velocityY = 0;
  }
  
  if(invisibleDescansoGroup.isTouching(fantasma)||fantasma.y>600){
    fantasma.destroy();
    GameState = "END";
  }
    
     }
  
  if (GameState === "END"){
    stroke("yellow");
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250)
      }
 
}

function spawnVentanas(){
  if(frameCount%240===0){
      ventana = createSprite (200,-50);
      descanso = createSprite (200,10);
      invisibleDescanso = createSprite(200,15);
      invisibleDescanso.width = descanso.width;
      invisibleDescanso.height = 2;
      descanso.addImage(descansoImg);
      ventana.addImage(ventanaImg);
      ventana.x = Math.round(random(120,400));
      ventana.velocityY = 1;
      descanso.velocityY = 1;
      invisibleDescanso.x= ventana.x;
      invisibleDescanso.velocityY= 1;
      descanso.x = ventana.x
      ventana.lifetime = 800;
      descanso.lifetime = 800;
      ventanasGroup.add(ventana);
      descansosGroup.add(descanso);
      invisibleDescansoGroup.add(invisibleDescanso);
      fantasma.depth= ventana.depth;
      fantasma.depth += 1;
     }
}
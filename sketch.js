  var jetpackperson,jetpackimage;
  var backgrounds,backgroundimage,bg1_img,bg2_img,bg3_img;
  var coin,coinsimage;
  var rocket,rocketimage,rsign,rsignimage;
  var zapper1image,zapper2image,zapper3image;
  var grnd,gameState="play";
  var score = 0;
  var z1Grp,z2Grp,z3Grp;
  var reset, rImage;
  var topB;

function preload()
{
  backgroundimage= loadImage("background.png");
  jetpackimage = loadImage("person.png");
  zapper1image= loadImage("zapper1.png");
  zapper2image = loadImage("zapper2.png");
  zapper3image = loadImage("zapper3.png")
  coinsimage = loadImage("coin.png");
  
  bg1_img = loadAnimation("bg1.jpg");
  bg2_img = loadAnimation("bg2.jpg");
  bg3_img = loadAnimation("bg3.jpg");
  rImage = loadImage("restart.gif");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  
  backgrounds =createSprite(width/2,height/2);
  backgrounds.addAnimation("bg",backgroundimage);
  backgrounds.addAnimation("bg1",bg1_img);
  backgrounds.addAnimation("bg2",bg2_img);
  backgrounds.addAnimation("bg3",bg3_img);

  jetpackperson =createSprite(50,height-70,20,50);
  // createSprite(50,height-70,20,50);
  jetpackperson.addImage(jetpackimage);
  jetpackperson.scale=0.4;
  //jetpackperson.debug=true;
  
  jetpackperson.setCollider('circle',0,0,70);
  
  grnd = createSprite(width/2,height,width,125);
  
  grnd.visible = false;
 
  
  coin=createSprite(Math.round(random(width/2+100,width/2+250)),Math.round(random(height/2,height/2+100)));
  coin.addImage(coinsimage);
  coin.scale=0.3;
  
  coin.visible=false;
  z1Grp = new Group();
  z2Grp = new Group();
  z3Grp = new Group();
  topB = createSprite(width/2,2,width,5);
  topB.visible = false;
  reset = createSprite(width/2,height/2);
  reset.addImage(rImage);
  reset.scale = 0.1;
  reset.visible = false;
 
 }

function draw() {
  background(backgroundimage);
  if(gameState==="play")
    {
      
    if(touches.length > 0 || keyDown("space"))
     {
      flag = true;
      jetpackperson.velocityY = -13;
      touches = [];    
     }
      
    jetpackperson.velocityY = jetpackperson.velocityY+1;
  
    if(frameCount%2===0)
       score = score+1;
      
      if(score>500 && score<600)
        {
        coin.velocityX=-11;
        coin.visible=true;
        }
      if(jetpackperson.isTouching(coin))
        {
       score=score+10;
        }
    if(score===300)
    backgrounds.changeAnimation("bg1",bg1_img);
  
    if(score===580)
    backgrounds.changeAnimation("bg2",bg2_img);
  
    if(score===740)
    backgrounds.changeAnimation("bg3",bg3_img);
  
    if(score===880)
    backgrounds.changeAnimation("bg1",bg1_img);
  
    if(score===1000)
    backgrounds.changeAnimation("bg2",bg2_img);
  
    if(score===1190)
    backgrounds.changeAnimation("bg3",bg3_img);
    backgrounds.velocityX = -4;
  
    if(backgrounds.x < 100)
      backgrounds.x =  backgrounds.width/2; 
  
    zapper1();
    zapper2();
    zapper3();
      
    if(z1Grp.isTouching(jetpackperson))
      gameState = "end";
      
      if(z2Grp.isTouching(jetpackperson))
      gameState = "end";
      
      if(z3Grp.isTouching(jetpackperson))
      gameState = "end";
      
     
      
     jetpackperson.bounceOff(topB); 
      
   }
  
   else if(gameState === "end")
    {
      
      backgrounds.velocityX = 0;
      z1Grp.setVelocityXEach(0);
      z1Grp.setLifetimeEach(-1);
      z2Grp.setVelocityXEach(0);
      z2Grp.setLifetimeEach(-1);
      z3Grp.setVelocityXEach(0);
      z3Grp.setLifetimeEach(-1);
      jetpackperson.velocityY = 0;
      reset.visible = true;
    
      
  if (touches.length > 0) {
     if (restart.overlapPoint(touches[0].x, touches[0].y))
    // if(mousePressedOver(reset))
        {
          gameState = "play";
          z1Grp.destroyEach();
          z2Grp.destroyEach();
          z3Grp.destroyEach();
          z1Grp.setLifetimeEach(-1);
          z2Grp.setLifetimeEach(-1);
          z3Grp.setLifetimeEach(-1);
          reset.visible = false;
          score = 0;
        }
  }
     if(mousePressedOver(reset))
        {
          gameState = "play";
          z1Grp.destroyEach();
          z2Grp.destroyEach();
          z3Grp.destroyEach();
          z1Grp.setLifetimeEach(-1);
          z2Grp.setLifetimeEach(-1);
          z3Grp.setLifetimeEach(-1);
          reset.visible = false;
          score = 0;
        }
     
    
    }
  jetpackperson.collide(grnd);
  

  drawSprites();
  
  stroke("red");
  textFont('inconsolata');
  textSize(30);
  text(score,30,50);
}

function zapper1()
{
  if(frameCount%100 === 0)
    {
      var zapper1 = createSprite(width,Math.round(random(height-300,height-150)));
      zapper1.addImage(zapper1image);
      //zapper1.debug = true;
      zapper1.setCollider("rectangle",-20,20,20,190); 
      zapper1.scale=0.9;
      zapper1.velocityX = -20;
      zapper1.lifetime = width/20;
      z1Grp.add(zapper1);
    }  
}

function zapper2()
{
  if(frameCount%90 === 0)
    {
      var zapper2 = createSprite(width,Math.round(random(height-400,height-100)));
      zapper2.addImage(zapper2image);
      zapper2.setCollider("rectangle",-1,-20,170,10);
     //zapper2.debug = true;
      zapper2.scale=0.9;
      zapper2.velocityX = -25;
      zapper2.lifetime = width/25;
      z2Grp.add(zapper2);
    }  
}
function zapper3()
{
  if(frameCount%90 === 0)
    {
      var zapper3 = createSprite(width,Math.round(random(height-550,height-300)));
      zapper3.addImage(zapper3image);
      zapper3.setCollider("rectangle",-1,-20,170,10);
      //zapper2.debug = true;
      zapper3.scale=0.3;
      zapper3.velocityX = -25;
      zapper3.lifetime = width/25;
      z3Grp.add(zapper3);
    }  
}


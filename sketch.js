var ball;
var database;
var cityImg,ballonImg  
function preload(){
cityImg=loadImage("cityImage.png")
ballonImg=loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")

}
function setup(){
    createCanvas(1500,700);
    database=firebase.database()
    var child=database.ref("car/position")
    child.on("value",readPosition)
    ball = createSprite(250,250,10,10);
   // ball.shapeColor = "red";
   ball.addAnimation("Hotair",ballonImg)
}

function draw(){
    background(cityImg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        ball.scale-=0.05
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        ball.scale+=0.05
    }
    drawSprites();
    fill("red")
    textSize(25)
    stroke("black")
    strokeWeight(5)
    text("Use arrow keys to move HotAirBallon. ",500,55)
    
}

function changePosition(x,y){
    database.ref("car/position").set({
        x:ball.x+x,
        y:ball.y+y
    })
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    var pos=date.val()
    ball.x=pos.x;
    ball.y=pos.y;
}

var canvas;
var bg;
var player, player_img;
var bg_sprite, bg2;
var fb1, fb2, fb3, fb4;
var game_over, go_img;
var fireball;
var rock, rock_img;
var light_obs, obs_img;

function preload() {
  bg = loadImage("./Images/bg2.jpg")
  player_img = loadImage("./Images/download.png")
  bg2 = loadImage("./Images/bg2.jpg")
  fb1 = loadImage("./Images/fireball(1).png")
  fb2 = loadImage("./Images/fireball(2).png")
  fb3 = loadImage("./Images/fireball(3).png")
  fb4 = loadImage("./Images/fireball(4).png")
  obs_img = loadImage("./Images/obstacle.jpg")
  go_img = loadImage("./Images/game-over.jpg")
  rock_img = loadImage("./Images/rock.gif")
}


function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 160)
  bg_sprite = createSprite(((displayWidth - 20) / 2), ((displayHeight - 300)))
  bg_sprite.addImage("bg2", bg)
  bg_sprite.scale = 1.5;
  game_over = createSprite(camera.x, camera.y)
  game_over.addImage("img", go_img);
  game_over.visible = false;
  player = createSprite(((displayWidth - 20) / 2), (displayHeight - 250))
  player.addImage("img", player_img)
}


function draw() {
  background("white")
  bg_sprite.velocityY = 2
  if (bg_sprite.y > (displayHeight - 50)) {
    bg_sprite.y = ((displayHeight - 300))
  }
  camera.position.x = player.x;
  camera.position.y = player.y;
  if (keyWentDown(LEFT_ARROW)) {
    player.x -= 50;
  }
  if (keyWentDown(RIGHT_ARROW)) {
    player.x += 50;
  }

  CreateObs();
  CreateRock();
  CreateFireball();
  drawSprites();
  textSize(50)
  fill("white")
  text(100, 100, "Dodge the obstacles") 
}

function CreateFireball() {
  if (frameCount % 300 == 0) {
    fireball = createSprite(camera.x, camera.y - (displayHeight / 2 + 10))
    fireball.addAnimation("fb_anime", fb1, fb2, fb3, fb4);
    fireball.velocityY = 15.5
    fireball.scale = 0.7;
    fireball.lifetime = 65
    if (player.isTouching(fireball)) {
      bg_sprite.velocityY = 0;
      fireball.velocityY = 0;
      game_over.visible = true;
    }
  }
}

function CreateRock() {
  if (frameCount % 215 == 0) {
    var r = random(-55,55)
    rock = createSprite((player.x + r), camera.y - (displayHeight / 2 + 10))
    rock.addImage("img", rock_img);
    rock.velocityY = 7
    rock.scale = 0.5;
    rock.lifetime = 135
    if (player.isTouching(rock)) {
      bg_sprite.velocityY = 0;
      rock.velocityY = 0;
      game_over.visible = true;
    }
  }
}

function CreateObs() {
  if (frameCount % 135 == 0) {
    var r = random(-125,35)
    obstacle = createSprite(camera.x + r, camera.y - (displayHeight / 2 + 10))
    obstacle.addImage("img", obs_img);
    obstacle.velocityY = 7
    obstacle.scale = 0.5;
    obstacle.lifetime = 135
    if (player.isTouching(obstacle)) {
      bg_sprite.velocityY = 0;
      obstacle.velocityY = 0;
      game_over.visible = true;
    }
  }
}
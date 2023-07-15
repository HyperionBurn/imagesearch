const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.75;
const q = -30;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/background.png'
});

const shop = new Sprite({
  position: {
    x: 560,
    y: 160
  },
  imageSrc: './assets/shop.png',
  scale: 2.5,
  framesMax: 6
});

// player
// player
// player

const player = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 50,
    y: 0
  },
  imageSrc: './assets/Idle.png',
  scale: 2.5,
  framesMax: 8,
  offset: {
    x: 215,
    y:154
  },
  sprites: {
    idle: {
      imageSrc: './assets/Idle.png',
      framesMax: 8,
      image: new Image()
    },
    run: {
      imageSrc: './assets/Run.png',
      framesMax: 8,
      image: new Image()
    },
    jump: {
      imageSrc: './assets/Jump.png',
      framesMax: 2,
      image: new Image()
    },
    fall: {
      imageSrc: './assets/Fall.png',
      framesMax: 2,
      image: new Image()
    },
    attack1: {
      imageSrc: './assets/Attack1.png',
      framesMax: 6,
      image: new Image()
    },
    takeHit: {
      imageSrc: './assets/Takehitw.png',
      framesMax: 4,
      image: new Image()
    },
    death: {
      imageSrc: './assets/Death.png',
      framesMax: 6,
      image: new Image()
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 158,
    height: 50
  },
  dead: false,
});

//enemy
//enemy
//enemy
//enemy

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 50,
    y: 0
  },
  imageSrc: './assets/kIdle.png',
  scale: 2.5,
  framesMax: 4,
  offset: {
    x: 215,
    y:170
  },
  sprites: {
    idle: {
      imageSrc: './assets/kIdle.png',
      framesMax: 4,
      image: new Image()
    },
    run: {
      imageSrc: './assets/kRun.png',
      framesMax: 8,
      image: new Image()
    },
    jump: {
      imageSrc: './assets/kJump.png',
      framesMax: 2,
      image: new Image()
    },
    fall: {
      imageSrc: './assets/kFall.png',
      framesMax: 2,
      image: new Image()
    },
    attack1: {
      imageSrc: './assets/kAttack1.png',
      framesMax: 4,
      image: new Image()
    },
    takeHit: {
      imageSrc: './assets/kTakehit.png',
      framesMax: 3,
      image: new Image()
    },
    death: {
      imageSrc: './assets/kDeath.png',
      framesMax: 7,
      image: new Image()
    }

  },
  attackBox: {
    offset: {
      x: -172,
      y: 50
    },
    width: 172,
    height: 50
  },
  dead: false,
});

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
};

decreaseTimer();

function gameReset() {
  clearTimeout(timerId);
  player.health = 100;
  enemy.health = 100;
  timer = 60;
  player.position.x = 400;
  player.position.y = 100;
  enemy.position.x = 400;
  enemy.position.y = 100;
  decreaseTimer();
  document.querySelector('#displayText').style.display = 'none';
  gsap.to('#playerHealth', {
    width: '100%',
    duration: 0.5
  });
  gsap.to('#enemyHealth', {
    width: '100%',
    duration: 0.5
  });
}


function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector('#displayText').style.display = 'flex';
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
    isGameOver = true;
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
    isGameOver = true;
  }
}

window.addEventListener('keydown', (event) => {
  if (isGameOver && event.key === 'h') {
    gameReset();
    isGameOver = false;
  }
});


window.addEventListener('keyup', (event) => {
  if (event.key === 'h') {
    if (player.health <= 0 || enemy.health <= 0) {
      gameReset();
    }
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  c.fillStyle = 'rgba(255, 255, 255,  0.2)'
  c.fillRect(0,0, canvas.width, canvas.height)
  enemy.update();
  player.update();
  player.velocity.x = 0;

  // Player 1 movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }
  // fall and jump
  if (player.velocity.y > 0) {
    player.switchSprite('fall');
  } else if (player.velocity.y < 0) {
    player.switchSprite('jump');
  }

  // Enemy movement

  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }
  // fall and jump
  if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  } else if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  }

  // Detect collision & hits
  if (
    rectangularCollision(
     player,
    enemy
    ) &&
    player.isAttacking && player.framesCurrent === 4
  ){
    enemy.takeHit()
    player.isAttacking = false;
    
    gsap.to('#enemyHealth', {
      width: enemy.health + '%',
      duration: 0.5,  // Set the duration of the animation
    });
  }
//if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

//player gets hit by enemy
  if (
    rectangularCollision(enemy,
       player)
       &&
    enemy.isAttacking
  ) {
    player.takeHit()
    enemy.isAttacking = false;
    gsap.to('#playerHealth', {
      width: player.health + '%',
      duration: 0.5,  // Set the duration of the animation
    });

  }

  //if enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (!player.dead && player.health > 0) {

  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = q;
      player.lastKey = 'w';
      break;
    case ' ':
      player.attack();
      break;
    // Enemy controls
    
  }}
  if (!enemy.dead && enemy.health > 0) {
  switch(event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case'ArrowUp':
      enemy.velocity.y = -30;
      enemy.lastKey = 'ArrowUp';
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }}
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = false;
      player.lastKey = 'a';
      break;
    // Enemy controls
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowDown':
      enemy.isAttacking = false;
      break;
  }
});

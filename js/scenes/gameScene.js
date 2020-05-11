// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  // game stats
  this.stats = {
    health: 100,
    fun: 100
  };

  // decay parameters
  this.decayRates = {
    health: -5,
    fun: -2
  }
};

// executed once, after assets were loaded
gameScene.create = function() {

  // game background
  let bg = this.add.sprite(0, 0, 'backyard');
  bg.setOrigin(0, 0);

  this.kuma = this.add.sprite(120, 200, 'kuma', 4)
  this.kuma.setScale(0.75);
  this.kuma.depth = 1;

  // create ui
  this.createUi();

  // show stats to the user
  this.createHud();
  this.refreshHud();

  // decay of health and fun over time
  this.timedEventStats = this.time.addEvent({
    delay: 1000,
    repeat: -1, // it will repeat forever
    callback: function(){
      // update stats
      this.updateStats(this.decayRates);
    },
    callbackScope: this
  });
};

// create ui
gameScene.createUi = function() {
  this.oneBtn = this.add.sprite(50, 530, 'one').setInteractive();
  this.oneBtn.customStats = {
    health: 10,
    fun: 15
  };
  this.oneBtn.on('pointerdown', this.pickItem);

  this.twoBtn = this.add.sprite(100, 530, 'two').setInteractive();
  this.twoBtn.customStats = {
    health: 10,
    fun: 15
  };
  this.twoBtn.on('pointerdown', this.pickItem);

  this.threeBtn = this.add.sprite(150, 530, 'three').setInteractive();
  this.threeBtn.customStats = {
    health: 10,
    fun: 15
  };
  this.threeBtn.on('pointerdown', this.pickItem);

  this.fourBtn = this.add.sprite(200, 530, 'four').setInteractive();
  this.fourBtn.customStats = {
    health: -10,
    fun: 15
  };
  this.fourBtn.on('pointerdown', this.pickItem);

  this.fiveBtn = this.add.sprite(250, 530, 'five').setInteractive();
  this.fiveBtn.customStats = {
    health: -10,
    fun: 5
  };
  this.fiveBtn.on('pointerdown', this.pickItem);

  this.sixBtn = this.add.sprite(50, 580, 'six').setInteractive();
  this.sixBtn.customStats = {
    health: -10,
    fun: 15
  };
  this.sixBtn.on('pointerdown', this.pickItem);

  this.sevenBtn = this.add.sprite(100, 580, 'seven').setInteractive();
  this.sevenBtn.customStats = {
    health: 10,
    fun: 15
  };
  this.sevenBtn.on('pointerdown', this.pickItem);

  this.eightBtn = this.add.sprite(150, 580, 'eight').setInteractive();
  this.eightBtn.customStats = {
    health: -10,
    fun: 0
  };
  this.eightBtn.on('pointerdown', this.pickItem);

  this.nineBtn = this.add.sprite(200, 580, 'nine').setInteractive();
  this.nineBtn.customStats = {
    health: 10,
    fun: 15
  };
  this.nineBtn.on('pointerdown', this.pickItem);

  this.zeroBtn = this.add.sprite(250, 580, 'zero').setInteractive();
  this.zeroBtn.customStats = {
    health: -10,
    fun: -15
  };
  this.zeroBtn.on('pointerdown', this.pickItem);

  // array with all buttons
  this.buttons = [this.oneBtn, this.twoBtn, this.threeBtn, this.fourBtn, this.fiveBtn, this.sixBtn, this.sevenBtn, this.eightBtn, this.nineBtn, this.zeroBtn]; // , this.rotateBtn

  // ui is not blocked
  this.uiBlocked = false;

  // refresh ui
  this.uiReady();
};

// pick item
gameScene.pickItem = function() {

  // the ui can't be blocked in order to select an item
  if (this.scene.uiBlocked) return;

  // make sure the ui is ready
  this.scene.uiReady();

  // select item
  this.scene.selectedItem = this;

  // change transparency
  this.alpha = 0.5;

  console.log('we are picking ' + this.texture.key);

  this.scene.randomItem();
};

// set ui to "ready"
gameScene.uiReady = function() {
  // nothing is being selected
  this.selectedItem = null;

  // set all buttons to alpha 1 (no transparency)
  for (let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].alpha = 1;
  }

  // scene must be unblocked
  this.uiBlocked = false;
};

// random new item on the game
gameScene.randomItem = function() {
  // check that an item was selected
  if (!this.selectedItem) return;

  
  // ui must be unblocked
  if (this.uiBlocked) return;

  // create a new item in the position the player clicked/tapped
  let randomX = Math.floor(Math.random() * (360 - 25)) + 25;
  let randomY = Math.floor(Math.random() * (400 - 25)) + 100;
  let newItem = this.add.sprite(randomX, randomY, this.selectedItem.texture.key);

  if (newItem.x > this.kuma.x) {
    this.kuma.play('right');
  }
  if (newItem.x < this.kuma.x) {
    this.kuma.play('left');
  }

  // block UI
  this.uiBlocked = true;

  // pet movement (tween)
  let petTween = this.tweens.add({
    targets: this.kuma,
    duration: 500,
    x: newItem.x,
    y: newItem.y,
    paused: false,
    callbackScope: this,
    onComplete: function(tween, sprites) {
      // destroy the item
      newItem.destroy();

      
      // update stats
      this.updateStats(this.selectedItem.customStats);
      this.kuma.play('turn');
      this.uiReady();
    }
  });
};

// create the text elements that will show the stats
gameScene.createHud = function() {
  // health stat
  this.healthText = this.add.text(20, 20, 'Health: ', {
    font: '24px Arial',
    fill: '#ffffff'
  });

  // fun stat
  this.funText = this.add.text(170, 20, 'Fun: ', {
    font: '24px Arial',
    fill: '#ffffff'
  });
};

// show the current value of health and fun
gameScene.refreshHud = function(){
  this.healthText.setText('Health: ' + this.stats.health);
  this.funText.setText('Fun: ' + this.stats.fun);
};

// stat updater
gameScene.updateStats = function(statDiff) {
  // manually update each stat
  // this.stats.health += statDiff.health;
  // this.stats.fun += statDiff.fun;

  // flag to see if it's game over
  let isGameOver = false;

  // more flexible
  for (stat in statDiff) {
    if (statDiff.hasOwnProperty(stat)) {
      this.stats[stat] += statDiff[stat];

      // stats can't be less than zero
      if(this.stats[stat] < 0) {
        isGameOver = true;
        this.stats[stat] = 0;
      }
    }
  }

  // refresh HUD
  this.refreshHud();

  // check to see if the game ended
  if(isGameOver) this.gameOver();
};

gameScene.gameOver = function() {
  // block ui
  this.uiBlocked = true;

  // change frame of the pet
  //this.pet.setFrame(4);

  // keep the game on for a some time, the move on
  this.time.addEvent({
    delay: 2000,
    repeat: 0,
    callback: function(){
      this.scene.start('Home');
    },
    callbackScope: this
  });
};

// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function () {
  // show logo
  let logo = this.add.sprite(this.sys.game.config.width / 2, 250, 'logo');

  // progress bar background
  let bgBar = this.add.graphics();

  let barW = 150;
  let barH = 30;

  bgBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );
  bgBar.fillStyle(0xf5f5f5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  // progress bar
  let progressBar = this.add.graphics();
  progressBar.setPosition(
    this.sys.game.config.width / 2 - barW / 2,
    this.sys.game.config.height / 2 - barH / 2
  );

  // listen to the "progress" event
  this.load.on(
    'progress',
    function (value) {
      // clearing progress bar (so we can draw it again)
      progressBar.clear();

      // set style
      progressBar.fillStyle(0x9ad98d, 1);

      // draw rectangle
      progressBar.fillRect(0, 0, value * barW, barH);
    },
    this
  );

  // load assets
  this.load.image('backyard', 'assets/images/yellow-bg.png');
  this.load.image('toy', 'assets/images/rubber_duck.png');

  // load json data
  /*this.load.json('numbers', 'assets/json/numbers.json');
  let x = this.cache.json.get('numbers');
  for (let number in x.numbers) {
    this.load.image(number.key, 'assets/' + number.path);
  }*/

  this.load.image('zero', 'assets/images/zero-s.png');
  this.load.image('one', 'assets/images/one-s.png');
  this.load.image('two', 'assets/images/two-s.png');
  this.load.image('three', 'assets/images/three-s.png');
  this.load.image('four', 'assets/images/four-s.png');
  this.load.image('five', 'assets/images/five-s.png');
  this.load.image('six', 'assets/images/six-s.png');
  this.load.image('seven', 'assets/images/seven-s.png');
  this.load.image('eight', 'assets/images/eight-s.png');
  this.load.image('nine', 'assets/images/nine-s.png');

  this.load.audio('one', 'assets/audio/1.mp3');
  this.load.audio('two', 'assets/audio/2.mp3');
  this.load.audio('three', 'assets/audio/3.mp3');
  this.load.audio('four', 'assets/audio/4.mp3');
  this.load.audio('five', 'assets/audio/5.mp3');
  this.load.audio('six', 'assets/audio/6.mp3');
  this.load.audio('seven', 'assets/audio/7.mp3');
  this.load.audio('eight', 'assets/audio/8.mp3');
  this.load.audio('nine', 'assets/audio/9.mp3');
  this.load.audio('zero', 'assets/audio/0.mp3');

  this.load.audio('correct', 'assets/audio/correct.mp3');
  this.load.audio('wrong', 'assets/audio/wrong.mp3');

  // load kuma
  this.load.spritesheet('kuma', 'assets/images/kuma-ani.png', {
    frameWidth: 123, // 124
    frameHeight: 162, // 164
    margin: 1,
    spacing: 1,
  });

  // TESTING - to see the progress bar in action!
  // for(let i = 0; i < 200; i++) {
  //   this.load.image('test' + i, 'assets/images/candy.png');
  // }
};

loadingScene.create = function () {
  // animation
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('kuma', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'kuma', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('kuma', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.scene.start('Home');
};

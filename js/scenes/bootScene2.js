// create a new scene
let bootScene = new Phaser.Scene('Boot');

bootScene.preload = function() {
  this.load.image('logo', 'https://github.com/boyone/phaser-pet/blob/master/assets/images/rubber_duck.png');
};

bootScene.create = function() {
  this.scene.start('Loading');
};

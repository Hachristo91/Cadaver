class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    init(){

    }

    create(){
        this.add.bitmapText(400, 150, "rocketSquare", "Fetch Quest");
        this.add.bitmapText(400, 330, "rocketSquare", "WASD to move");
        this.add.bitmapText(400, 360, "rocketSquare", "E to interact");
        this.add.bitmapText(400, 390, "rocketSquare", "1 and 2 to talk");
        this.add.bitmapText(400, 420, "rocketSquare", "Press Space to Begin");
        this.rKey = this.input.keyboard.addKey('SPACE');
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.start("townScene");
        }
    }


}
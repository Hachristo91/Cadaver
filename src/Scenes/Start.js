class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    init(){

    }

    create(){
        this.add.bitmapText(330, 300, "rocketSquare", "Fetch Quest");
        this.add.bitmapText(220, 330, "rocketSquare", "Press Space to Begin");
        this.rKey = this.input.keyboard.addKey('SPACE');
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.start("townScene");
        }
    }


}
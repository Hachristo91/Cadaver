class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    init(){

    }

    create(){
        this.add.bitmapText(330, 300, "rocketSquare", "You Win");
        this.add.bitmapText(220, 330, "rocketSquare", "Press R to Restart");
        this.rKey = this.input.keyboard.addKey('R');
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.start("townScene");
        }
    }


}
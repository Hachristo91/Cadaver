class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load townsfolk
        this.load.image("purple", "purple_townie.png");
        this.load.image("blue", "blue_townie.png");

        // Load tilemap information
        this.load.image("tilemap_tiles", "roguelikeSheet_transparent.png");                   // Packed tilemap
        this.load.tilemapTiledJSON("town", "town.tmj");   // Tilemap in JSON
    }

    create() {
        

         // ...and pass to the next Scene
         this.scene.start("pathfinderScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
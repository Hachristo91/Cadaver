class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load townsfolk
        this.load.image("purple", "front_idle.png");
        this.load.image("front_left", "front_left.png");
        this.load.image("front_right", "front_right.png");
        this.load.image("front_stab", "front_stab.png");
        this.load.image("right", "right_idle.png");
        this.load.image("right_left", "right_left.png");
        this.load.image("right_right", "right_right.png");
        this.load.image("right_stab", "right_stab.png");
        this.load.image("left", "left_idle.png");
        this.load.image("left_left", "left_left.png");
        this.load.image("left_right", "left_right.png");
        this.load.image("left_stab", "left_stab.png");
        this.load.image("back", "back_idle.png");
        this.load.image("back_left", "back_left.png");
        this.load.image("back_right", "back_right.png");
        this.load.image("back_stab", "back_stab.png");

        this.load.image("textBox", "textBox.png");

        // Load tilemap information
        this.load.image("tilemap_tiles", "roguelikeSheet_transparent.png");                   // Packed tilemap
        this.load.image("townsfolk_tiles", "townsfolk.png");
        this.load.tilemapTiledJSON("town", "town.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("blacksmith", "blacksmith.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("cleric", "cleric.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("church", "church.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("tavern", "tavern.tmj");   // Tilemap in JSON

        this.load.audio("town_theme", "Town_theme.mp3");
        this.load.audio("attack", "knifeSlice.ogg");

        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
    }

    create() {
        this.anims.create({
            key: 'down_idle',
            frames: [
                { key: "purple" },
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_down',
            frames: [
                { key: "front_left" },
                { key: "front_right" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'down_stab',
            frames: [
                { key: "front_stab" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_idle',
            frames: [
                { key: "right" },
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: [
                { key: "right_left" },
                { key: "right_right" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_stab',
            frames: [
                { key: "right_stab" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_idle',
            frames: [
                { key: "left" },
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: [
                { key: "left_left" },
                { key: "left_right" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_stab',
            frames: [
                { key: "left_stab" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'back_idle',
            frames: [
                { key: "back" },
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_back',
            frames: [
                { key: "back_left" },
                { key: "back_right" }
            ],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'back_stab',
            frames: [
                { key: "back_stab" }
            ],
            frameRate: 4,
            repeat: -1
        });

         // ...and pass to the next Scene
         this.scene.start("townScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
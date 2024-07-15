class Blacksmith extends Phaser.Scene {
    constructor() {
        super("blacksmithScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 10;
        this.TILEHEIGHT = 7;
        this.zone = "none";
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 10 tiles wide and 7 tiles tall
        console.log(exitX,exitY);
        this.map = this.add.tilemap("blacksmith", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = this.map.addTilesetImage("rpg-town", "tilemap_tiles");

        // Create the layers
        this.floorLayer = this.map.createLayer("floor", this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer("walls-n-furniture", this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer("deco", this.tileset, 0, 0);

        // Objects
        this.shop = this.map.createFromObjects("zones", {
            name: "shop"
        });
        this.town = this.map.createFromObjects("zones", {
            name: "town"
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.shop, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.town, Phaser.Physics.Arcade.STATIC_BODY);

        my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), "purple").setOrigin(0,0);
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        this.select = this.input.keyboard.addKey('E');

        // Handle collision with objects
        this.physics.add.overlap(my.sprite.purpleTownie, this.town, (obj1, obj2) => {
            this.zone = "town";
            if(this.select.isDown){
                obj2.destroy();
                console.log("loading town");
                this.scene.start("townScene");
            }
        });

        // Create townsfolk sprite
        // Use setOrigin() to ensure the tile space computations work well

        this.physics.add.collider(my.sprite.purpleTownie, this.wallLayer);

        this.wallLayer.setCollisionByProperty({
            collides: true
        });

        my.sprite.purpleTownie.setMaxVelocity(500);
        
        // Camera settings
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.purpleTownie);
        this.cameras.main.setZoom(this.SCALE);

        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');

        this.physics.world.drawDebug = true;

    }

    update() {
        if(this.up.isDown && this.left.isDown){
            my.sprite.purpleTownie.setVelocityY(-70);
            my.sprite.purpleTownie.setVelocityX(-70);
            my.sprite.purpleTownie.flipX = true;
        } else if(this.left.isDown && this.down.isDown){
            my.sprite.purpleTownie.setVelocityX(-70);
            my.sprite.purpleTownie.flipX = true;
            my.sprite.purpleTownie.setVelocityY(70);
        } else if(this.down.isDown && this.right.isDown){
            my.sprite.purpleTownie.setVelocityY(70);
            my.sprite.purpleTownie.setVelocityX(70);
            my.sprite.purpleTownie.flipX = false;
        } else if(this.right.isDown && this.up.isDown){
            my.sprite.purpleTownie.setVelocityY(-70);
            my.sprite.purpleTownie.setVelocityX(70);
            my.sprite.purpleTownie.flipX = false;
        } else if(this.up.isDown){
            my.sprite.purpleTownie.setVelocityY(-100);
            my.sprite.purpleTownie.setVelocityX(0);
        } else if(this.left.isDown){
            my.sprite.purpleTownie.setVelocityX(-100);
            my.sprite.purpleTownie.setVelocityY(0);
            my.sprite.purpleTownie.flipX = true;
        } else if(this.down.isDown){
            my.sprite.purpleTownie.setVelocityY(100);
            my.sprite.purpleTownie.setVelocityX(0);
        } else if(this.right.isDown){
            my.sprite.purpleTownie.setVelocityX(100);
            my.sprite.purpleTownie.setVelocityY(0);
            my.sprite.purpleTownie.flipX = false;
        } else {
            my.sprite.purpleTownie.setVelocity(0);
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

}

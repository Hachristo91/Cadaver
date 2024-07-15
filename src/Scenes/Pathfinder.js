class Pathfinder extends Phaser.Scene {
    constructor() {
        super("pathfinderScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 25;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 40 tiles wide and 25 tiles tall
        this.map = this.add.tilemap("town", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = this.map.addTilesetImage("rpg-town", "tilemap_tiles");

        // Create the layers
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.pathLayer = this.map.createLayer("path", this.tileset, 0, 0);
        this.treesLayer = this.map.createLayer("vegetation", this.tileset, 0, 0);
        this.housesLayer = this.map.createLayer("buildings", this.tileset, 0, 0);
        this.roofsLayer = this.map.createLayer("roof", this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer("building-deco", this.tileset, 0, 0);

        // Create townsfolk sprite
        // Use setOrigin() to ensure the tile space computations work well
        my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), "purple").setOrigin(0,0);
        my.sprite.purpleTownie.setScale(0.8);

        this.physics.add.collider(my.sprite.purpleTownie, this.housesLayer);

        this.housesLayer.setCollisionByProperty({
            collides: true
        });

        my.sprite.purpleTownie.setMaxVelocity(500);
        
        // Camera settings
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.purpleTownie);
        this.cameras.main.setZoom(this.SCALE);

        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');

    }

    update() {
        if(this.up.isDown){
            my.sprite.purpleTownie.setVelocityY(-100);
        } else if(this.left.isDown){
            my.sprite.purpleTownie.setVelocityX(-100);
            my.sprite.purpleTownie.flipX = true;
        } else if(this.down.isDown){
            my.sprite.purpleTownie.setVelocityY(100);
        } else if(this.right.isDown){
            my.sprite.purpleTownie.setVelocityX(100);
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

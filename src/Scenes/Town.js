class Town extends Phaser.Scene {
    constructor() {
        super("townScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 25;
        this.zone = "none";
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

        // Objects
        this.crypt = this.map.createFromObjects("special-areas", {
            name: "crypt"
        });
        this.statue = this.map.createFromObjects("special-areas", {
            name: "statue"
        });
        this.cleric = this.map.createFromObjects("special-areas", {
            name: "cleric"
        });
        this.church = this.map.createFromObjects("special-areas", {
            name: "church"
        });
        this.kiosk = this.map.createFromObjects("special-areas", {
            name: "kiosk"
        });
        this.pond = this.map.createFromObjects("special-areas", {
            name: "pond"
        });
        this.flowerbed = this.map.createFromObjects("special-areas", {
            name: "flowerbed"
        });
        this.blacksmith = this.map.createFromObjects("special-areas", {
            name: "blacksmith"
        });
        this.tavern = this.map.createFromObjects("special-areas", {
            name: "tavern"
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.crypt, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.statue, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.cleric, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.church, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.kiosk, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.pond, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.flowerbed, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.blacksmith, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.tavern, Phaser.Physics.Arcade.STATIC_BODY);

        if(exitX == 0 && exitY == 0){
            my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(28.5), this.tileYtoWorld(12), "purple").setOrigin(0,0);
        } else {
            my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(exitX), this.tileYtoWorld(exitY), "purple").setOrigin(0,0);
        }
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        this.select = this.input.keyboard.addKey('E');

        // Handle collision with objects
        this.physics.add.overlap(my.sprite.purpleTownie, this.crypt, (obj1, obj2) => {
            this.zone = "crypt";
            if(this.select.isDown){
                console.log("loading crypt");
            }
        });
        this.physics.add.overlap(my.sprite.purpleTownie, this.cleric, (obj1, obj2) => {
            this.zone = "cleric";
            if(this.select.isDown){
                console.log("loading cleric");
                obj2.destroy();
                exitX = 24.5;
                exitY = 13;
                this.scene.start("clericScene");
            }
        });
        this.physics.add.overlap(my.sprite.purpleTownie, this.church, (obj1, obj2) => {
            this.zone = "church";
            if(this.select.isDown){
                console.log("loading church");
                obj2.destroy();
                exitX = 20.5;
                exitY = 13;
                this.scene.start("churchScene");
            }
        });
        this.physics.add.overlap(my.sprite.purpleTownie, this.blacksmith, (obj1, obj2) => {
            this.zone = "blacksmith";
            if(this.select.isDown){
                console.log("loading blacksmith");
                obj2.destroy();
                exitX = 33;
                exitY = 13;
                this.scene.start("blacksmithScene");
            }
        });
        this.physics.add.overlap(my.sprite.purpleTownie, this.tavern, (obj1, obj2) => {
            this.zone = "tavern";
            if(this.select.isDown){
                console.log("loading tavern");
                obj2.destroy();
                exitX = 14;
                exitY = 13;
                this.scene.start("tavernScene");
            }
        });

        // Create townsfolk sprite
        // Use setOrigin() to ensure the tile space computations work well

        this.physics.add.collider(my.sprite.purpleTownie, this.housesLayer);

        this.housesLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(my.sprite.purpleTownie, this.treesLayer);

        this.treesLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(my.sprite.purpleTownie, this.roofsLayer);

        this.roofsLayer.setCollisionByProperty({
            collides: true
        });

        my.sprite.purpleTownie.setMaxVelocity(500);
        
        // Camera settings
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.purpleTownie.body);
        this.cameras.main.setZoom(this.SCALE);

        this.up = this.input.keyboard.addKey('W');
        this.left = this.input.keyboard.addKey('A');
        this.down = this.input.keyboard.addKey('S');
        this.right = this.input.keyboard.addKey('D');

        this.attack = this.input.keyboard.addKey('SPACE');

        this.physics.world.drawDebug = true;
        this.attackBuffer = 0;
        this.facing = "down";

    }

    update() {
        if(this.attackBuffer > 10){
            if(this.up.isDown){
                my.sprite.purpleTownie.setVelocityY(-100);
                my.sprite.purpleTownie.setVelocityX(0);
                my.sprite.purpleTownie.anims.play('walk_back', true);
                this.facing = "up";
            } else if(this.left.isDown){
                my.sprite.purpleTownie.setVelocityX(-100);
                my.sprite.purpleTownie.setVelocityY(0);
                my.sprite.purpleTownie.anims.play('walk_left', true);
                this.facing = "left";
            } else if(this.down.isDown){
                my.sprite.purpleTownie.setVelocityY(100);
                my.sprite.purpleTownie.setVelocityX(0);
                my.sprite.purpleTownie.anims.play('walk_down', true);
                this.facing = "down";
            } else if(this.right.isDown){
                my.sprite.purpleTownie.setVelocityX(100);
                my.sprite.purpleTownie.setVelocityY(0);
                my.sprite.purpleTownie.anims.play('walk_right', true);
                this.facing = "right";
            } else {
                my.sprite.purpleTownie.setVelocity(0);
                if(this.facing == "down"){
                    my.sprite.purpleTownie.anims.play('down_idle', true);
                } else if(this.facing == "right"){
                    my.sprite.purpleTownie.anims.play('right_idle', true);
                } else if(this.facing == "left"){
                    my.sprite.purpleTownie.anims.play('left_idle', true);
                } else {
                    my.sprite.purpleTownie.anims.play('back_idle', true);
                }
            }
        } else {
            my.sprite.purpleTownie.setVelocity(0);
            if(this.facing == "down"){
                my.sprite.purpleTownie.anims.play('down_idle', true);
            } else if(this.facing == "right"){
                my.sprite.purpleTownie.anims.play('right_idle', true);
            } else if(this.facing == "left"){
                my.sprite.purpleTownie.anims.play('left_idle', true);
            } else {
                my.sprite.purpleTownie.anims.play('back_idle', true);
            }
        }

        if(this.attack.isDown && this.attackBuffer > 10){
            my.sprite.purpleTownie.setVelocity(0);
            this.attackBuffer = 0;
        }

        if(this.attackBuffer < 10){
            if(this.facing == "down"){
                my.sprite.purpleTownie.anims.play('down_stab', true);
            } else if(this.facing == "right"){
                my.sprite.purpleTownie.anims.play('right_stab', true);
            } else if(this.facing == "left"){
                if(this.attackBuffer == 0){
                    this.cameras.main.stopFollow();
                    my.sprite.purpleTownie.x -= 12;
                    my.sprite.purpleTownie.body.setOffset(15, 0);
                }
                my.sprite.purpleTownie.anims.play('left_stab', true);
                if(this.attackBuffer == 9){
                    my.sprite.purpleTownie.x += 12;
                    my.sprite.purpleTownie.body.setOffset(0, 0);
                    my.sprite.purpleTownie.anims.play('left_idle', true);
                    this.cameras.main.startFollow(my.sprite.purpleTownie.body);
                }
            } else {
                if(this.attackBuffer == 0){
                    this.cameras.main.stopFollow();
                    my.sprite.purpleTownie.y -= 12;
                    my.sprite.purpleTownie.body.setOffset(0, 15);
                }
                my.sprite.purpleTownie.anims.play('back_stab', true);
                if(this.attackBuffer == 9){
                    my.sprite.purpleTownie.y += 12;
                    my.sprite.purpleTownie.body.setOffset(0, 0);
                    my.sprite.purpleTownie.anims.play('back_idle', true);
                    this.cameras.main.startFollow(my.sprite.purpleTownie.body);
                }
            }
        }

        this.attackBuffer++;
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

}

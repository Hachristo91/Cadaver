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
        this.talking = false;
        this.kioskLine = 0;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 40 tiles wide and 25 tiles tall
        this.map = this.add.tilemap("town", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = [this.map.addTilesetImage("rpg-town", "tilemap_tiles"), this.map.addTilesetImage("townsfolk", "townsfolk_tiles")];

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
            this.sound.play("town_theme", {
                volume: 0   // Can adjust volume using this, goes from 0 to 1
            });
        } else {
            my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(exitX), this.tileYtoWorld(exitY), "purple").setOrigin(0,0);
        }
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        my.sprite.textBox = this.physics.add.sprite(this.tileXtoWorld(28.5), this.tileYtoWorld(12), "textBox");
        my.sprite.textBox.setScale(1, 0.5);
        my.sprite.textBox.visible = false;

        this.select = this.input.keyboard.addKey('E');

        // Text
        this.kioskText = [
            "Hail, friend! Care to browse my wares? It's dangerous\r\nto go alone...Without a healing potion!\r\nOnly 100 gold!\r\n1. Can you give me some money?\r\n2. No thanks",
            "Need gold, eh? It just so happens that my supply of\r\nhealing potions is running low...Tell you what:\r\nI'll give you 50 gold for a healing potion\r\n1. How can I find one?\r\n2. Deal!",
            "Well, you'll need some holy water to start. Fill up a\r\nbottle with that, add a tear from a soul in\r\ntrue love, and voila! Easy\r\n1. Alright, I'll give it a shot\r\n2. I don't think so",
            "Great! Come back here when you think you've got it\r\n1. Leave",
            "Well, I guess you'll have to find another way to get\r\nthe money then. Good luck!\r\n1. Leave",
            "No, that's not quite right. Keep looking, I believe in you!",
            "Wow, you actually managed to do it! I'm impressed. Here's the gold, as promised"
        ]

        this.k1 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[0], 8);
        this.k1.visible = false;

        this.k2 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[1], 8);
        this.k2.visible = false;

        this.k3 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[2], 8);
        this.k3.visible = false;

        this.k4 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[3], 8);
        this.k4.visible = false;

        this.k5 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[4], 8);
        this.k5.visible = false;

        this.k6 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[5], 8);
        this.k6.visible = false;

        this.k7 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.kioskText[6], 8);
        this.k7.visible = false;

        // Handle collision with objects
        this.physics.add.overlap(my.sprite.purpleTownie, this.crypt, (obj1, obj2) => {
            this.zone = "crypt";
            if(this.select.isDown){
                console.log("loading crypt");
            }
        });
        this.physics.add.overlap(my.sprite.purpleTownie, this.kiosk, (obj1, obj2) => {
            if(this.select.isDown){
                my.sprite.textBox.visible = true;
                this.talking = true;
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
            this.add.bitmapText(this.tileXtoWorld(34), this.tileYtoWorld(13), "rocketSquare", "Enter " + this.zone + "?", 5);
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

        this.option1 = this.input.keyboard.addKey('ONE');
        this.option2 = this.input.keyboard.addKey('TWO');

        this.physics.world.drawDebug = false;
        this.attackBuffer = 0;
        this.talkBuffer = 0;
        this.facing = "down";

    }

    update() {
        if(this.talking == false){
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

            if(this.attack.isDown && this.attackBuffer > 15){
                my.sprite.purpleTownie.setVelocity(0);
                this.attackBuffer = 0;
                this.sound.play("attack", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
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
            my.sprite.textBox.x = Math.max(my.sprite.purpleTownie.x, 160);
            my.sprite.textBox.y = Math.max(my.sprite.purpleTownie.y - 65, 35);

        } else {
            this.kioskTalk()
            this.talkBuffer++;
                

        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    kioskTalk() {
        if(this.kioskLine == 0){ // Want to buy a healing potion?
            this.k1.x = my.sprite.textBox.x-145;
            this.k1.y = my.sprite.textBox.y-25;
            this.k1.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // Need money
                this.talkBuffer = 0;
                this.kioskLine = 1;
            } else if(this.option2.isDown && this.talkBuffer > 30){ // leave
                this.k1.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else if(this.kioskLine == 1){
            this.k1.visible = false;
            this.k2.x = my.sprite.textBox.x-145;
            this.k2.y = my.sprite.textBox.y-25;
            this.k2.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // how to make potion
                this.talkBuffer = 0;
                this.kioskLine = 2;
            } else if(this.option2.isDown && this.talkBuffer > 30){ // deal
                this.talkBuffer = 0;
                this.kioskLine = 3;
            } else {

            }
        } else if(this.kioskLine == 2){
            this.k2.visible = false;
            this.k3.x = my.sprite.textBox.x-145;
            this.k3.y = my.sprite.textBox.y-25;
            this.k3.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // i'll try
                this.talkBuffer = 0;
                this.kioskLine = 3;
            } else if(this.option2.isDown && this.talkBuffer > 30){ // no thanks
                this.talkBuffer = 0;
                this.kioskLine = 4;
            } else {

            }
        } else if(this.kioskLine == 3){
            this.k2.visible = false;
            this.k3.visible = false;
            this.k4.x = my.sprite.textBox.x-145;
            this.k4.y = my.sprite.textBox.y-25;
            this.k4.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // leave
                this.k4.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else if(this.kioskLine == 4){
            this.k3.visible = false;
            this.k5.x = my.sprite.textBox.x-145;
            this.k5.y = my.sprite.textBox.y-25;
            this.k5.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // leave
                this.k5.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        }
    }



}

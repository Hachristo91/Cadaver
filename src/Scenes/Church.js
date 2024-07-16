class Church extends Phaser.Scene {
    constructor() {
        super("churchScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 10;
        this.TILEHEIGHT = 15;
        this.zone = "none";
        this.talking = false;
        this.priestLine = 0;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 10 tiles wide and 15 tiles tall
        console.log(exitX,exitY);
        this.map = this.add.tilemap("church", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = [this.map.addTilesetImage("rpg-town", "tilemap_tiles"), this.map.addTilesetImage("townsfolk", "townsfolk_tiles")];

        // Create the layers
        this.floorLayer = this.map.createLayer("floor", this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer("walls-n-furniture", this.tileset, 0, 0);
        this.peopleLayer = this.map.createLayer("people", this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer("deco", this.tileset, 0, 0);

        // Objects
        this.priest = this.map.createFromObjects("zones", {
            name: "priest"
        });
        this.town = this.map.createFromObjects("zones", {
            name: "town"
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.priest, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.town, Phaser.Physics.Arcade.STATIC_BODY);

        my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(4.5), this.tileYtoWorld(13), "purple").setOrigin(0,0);
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        my.sprite.textBox = this.physics.add.sprite(160, 35, "textBox");
        my.sprite.textBox.setScale(1, 0.5);
        my.sprite.textBox.visible = false;

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

        this.physics.add.overlap(my.sprite.purpleTownie, this.priest, (obj1, obj2) => {
            this.zone = "priest";
            if(this.select.isDown){
                my.sprite.textBox.visible = true;
                this.talking = true;
            }
        });

        // Create townsfolk sprite
        // Use setOrigin() to ensure the tile space computations work well

        this.physics.add.collider(my.sprite.purpleTownie, this.wallLayer);

        this.wallLayer.setCollisionByProperty({
            collides: true
        });

        my.sprite.purpleTownie.setMaxVelocity(500);

        // Text
        this.priestText = [
            "Blessed day, my child. What can I do for you?\r\n1. Can you bless this water?\r\n2. Nothing right now",
            "Of course. May this water bring peace to the\r\nvirtuous, and wrath to the damned\r\n1. Thanks",
            "Blessed day, my child. What can I do for you?\r\n1. Nothing right now"
        ];

        this.p1 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.priestText[0], 8);
        this.p1.visible = false;

        this.p2 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.priestText[1], 8);
        this.p2.visible = false;

        this.p3 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.priestText[2], 8);
        this.p3.visible = false;

        
        // Camera settings
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.purpleTownie);
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
        } else {
            this.priestTalk();
            this.talkBuffer++;
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    priestTalk() {
        if(questState != 4){ // blessed day
            this.p3.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // No thanks
                this.p3.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else {
            if(this.priestLine == 0){ // blessed day
                this.p1.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // can i have a bottle
                    this.talkBuffer = 0;
                    this.priestLine = 1;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // no thanks
                    this.p1.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.priestLine == 1){ // blessing
                this.p1.visible = false;
                this.p2.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // thank you
                    this.p2.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                    questState = 5;
                } else {

                }
            }
        }
    }

}

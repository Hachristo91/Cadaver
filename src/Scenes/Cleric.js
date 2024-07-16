class Cleric extends Phaser.Scene {
    constructor() {
        super("clericScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 7;
        this.TILEHEIGHT = 10;
        this.zone = "none";
        this.talking = false;
        this.clericLine = 0;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 7 tiles wide and 10 tiles tall
        console.log(exitX,exitY);
        this.map = this.add.tilemap("cleric", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = [this.map.addTilesetImage("rpg-town", "tilemap_tiles"), this.map.addTilesetImage("townsfolk", "townsfolk_tiles")];

        // Create the layers
        this.floorLayer = this.map.createLayer("floor", this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer("walls-n-furniture", this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer("deco", this.tileset, 0, 0);

        // Objects
        this.cleric = this.map.createFromObjects("zones", {
            name: "cleric"
        });
        this.town = this.map.createFromObjects("zones", {
            name: "town"
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.cleric, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.town, Phaser.Physics.Arcade.STATIC_BODY);

        my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(3), this.tileYtoWorld(8), "purple").setOrigin(0,0);
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        my.sprite.textBox = this.physics.add.sprite(160, 35, "textBox");
        my.sprite.textBox.setScale(1, 0.5);
        my.sprite.textBox.visible = false;

        this.select = this.input.keyboard.addKey('E');

        // Text
        this.clericText = [
            "Books, books, books...What's the point? Nothing in\r\nthese dusty tomes can compare to my love...\r\n1. I have a flower for you\r\n2. Leave",
            "A flower, a gesture of romance! On who's behalf do\r\nyou deliver it?\r\n1. It's from me\r\n2. It's from the blacksmith",
            "From you? No offense, but you're nothing compared\r\nto my love. Go woo someone else\r\n1. Leave",
            "From him! Oh, I've dreampt of this day, and now it\r\nhas arrived! I weep with joy unparalleled!\r\n1. Catch a tear\r\n2. Back away slowly",
            "Books, books, books...What's the point? Nothing in\r\nthese dusty tomes can compare to my love...\r\n1. Leave",
            "A flower, a gesture of romance! On who's behalf do\r\nyou deliver it?\r\n1. It's from me",
            "From him! Oh, I've dreampt of this day, and now it\r\nhas arrived! I weep with joy unparalleled!\r\n1. Back away slowly"
        ];

        this.c1 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[0], 8);
        this.c1.visible = false;

        this.c2 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[1], 8);
        this.c2.visible = false;

        this.c3 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[2], 8);
        this.c3.visible = false;

        this.c4 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[3], 8);
        this.c4.visible = false;

        this.c5 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[4], 8);
        this.c5.visible = false;

        this.c6 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[5], 8);
        this.c6.visible = false;

        this.c7 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.clericText[6], 8);
        this.c7.visible = false;

        // Handle collision with objects
        this.physics.add.overlap(my.sprite.purpleTownie, this.town, (obj1, obj2) => {
            this.zone = "town";
            if(this.select.isDown){
                obj2.destroy();
                console.log("loading town");
                this.scene.start("townScene");
            }
        });

        this.physics.add.overlap(my.sprite.purpleTownie, this.cleric, (obj1, obj2) => {
            this.zone = "cleric";
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
            this.clericTalk();
            this.talkBuffer++;
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    clericTalk() {
        if(flower == false){ // books are nothing compared to my love
            this.c5.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // Leave
                this.c5.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else if(secret == false){
            if(this.clericLine == 0){ // books are nothing compared to my love
                this.c1.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // i have a flower
                    this.talkBuffer = 0;
                    this.clericLine = 5;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // leave
                    this.c1.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.clericLine == 5){ // a flower? who from
                this.c1.visible = false;
                this.c6.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // from me
                    this.talkBuffer = 0;
                    this.clericLine = 2;
                } else {

                }
            } else if(this.clericLine == 2){ // you're not my love
                this.c6.visible = false;
                this.c3.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // leave
                    this.c3.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                    flower = false;
                } else {

                }
            }
        } else if(secret == true){
            if(this.clericLine == 0){ // books are nothing compared to my love
                this.c1.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // i have a flower
                    this.talkBuffer = 0;
                    this.clericLine = 1;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // leave
                    this.c1.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.clericLine == 1){ // a flower? who from
                this.c1.visible = false;
                this.c2.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // from me
                    this.talkBuffer = 0;
                    this.clericLine = 2;
                } else if(this.option2.isDown && this.talkBuffer > 30){
                    this.talkBuffer = 0;
                    this.clericLine = 3;
                } else {

                }
            } else if(this.clericLine == 2){ // you're not my love
                this.c2.visible = false;
                this.c3.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // leave
                    this.c3.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                    flower = false;
                } else {

                }
            } else if(this.clericLine == 3){ // I'm crying
                if(questState >= 3){
                    this.c2.visible = false;
                    this.c4.visible = true;
                    if(this.option1.isDown && this.talkBuffer > 30){ // catch tear
                        this.c4.visible = false;
                        my.sprite.textBox.visible = false;
                        this.talking = false;
                        flower = false;
                        tearquestState = 3;
                    } else if(this.option2.isDown && this.talkBuffer > 30){
                        this.c4.visible = false;
                        my.sprite.textBox.visible = false;
                        this.talking = false;
                        flower = false;
                    } else {

                    }
                } else { // I'm crying
                    this.c2.visible = false;
                    this.c7.visible = true;
                    if(this.option1.isDown && this.talkBuffer > 30){ // catch tear
                        this.c7.visible = false;
                        my.sprite.textBox.visible = false;
                        this.talking = false;
                        flower = false;
                    } else {

                    }
                }
            }
        }
    }

}

class Tavern extends Phaser.Scene {
    constructor() {
        super("tavernScene");
    }

    preload() {
    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 4.0;
        this.TILEWIDTH = 19;
        this.TILEHEIGHT = 15;
        this.zone = "none";
        this.talking = false;
        this.guildLine = 0;
        this.barLine = 0;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 19 tiles wide and 15 tiles tall
        console.log(exitX,exitY);
        this.map = this.add.tilemap("tavern", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = [this.map.addTilesetImage("rpg-town", "tilemap_tiles"), this.map.addTilesetImage("townsfolk", "townsfolk_tiles")];

        // Create the layers
        this.floorLayer = this.map.createLayer("floor", this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer("walls-n-furniture", this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer("deco", this.tileset, 0, 0);
        this.deco2Layer = this.map.createLayer("deco2", this.tileset, 0, 0);

        // Objects
        this.bar = this.map.createFromObjects("zones", {
            name: "bar"
        });
        this.quests = this.map.createFromObjects("zones", {
            name: "quests"
        });
        this.town = this.map.createFromObjects("zones", {
            name: "town"
        });

        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.bar, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.quests, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.town, Phaser.Physics.Arcade.STATIC_BODY);

        my.sprite.purpleTownie = this.physics.add.sprite(this.tileXtoWorld(9), this.tileYtoWorld(13), "purple").setOrigin(0,0);
        my.sprite.purpleTownie.setCollideWorldBounds(true);
        my.sprite.purpleTownie.setScale(0.8);

        my.sprite.textBox = this.physics.add.sprite(this.map.widthInPixels/2, this.tileYtoWorld(12), "textBox");
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

        this.physics.add.overlap(my.sprite.purpleTownie, this.quests, (obj1, obj2) => {
            this.zone = "quests";
            if(this.select.isDown){
                my.sprite.textBox.visible = true;
                this.talking = true;
            }
        });

        this.physics.add.overlap(my.sprite.purpleTownie, this.bar, (obj1, obj2) => {
            this.zone = "bar";
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
        this.guildText = [
            "Step right up, step right up! Adventurers wanted,\r\nquests available!\r\n1. I'll take one quest please\r\n2. Leave",
            "Of course! I just need to see your guild ID, please\r\n1. I don't have an ID",
            "Well, I can't give you a quest if you're not part\r\nof the guild.\r\n1. I'd like to join\r\n2. Can't you make an exception?",
            "Sure! I'll just need 50 gold for the application\r\n1. I don't have 50 gold",
            "Sorry, dems da rules. It's more than my job's worth\r\n1. Alright, I'll join the guild\r\n2. Leave",
            "Tough luck, buddy. Come back when you're a little,\r\nmmm, richer!\r\n1. Fine",
            "You again? You know the drill, 50 gold or beat it\r\n1. Beat it",
            "You again? You know the drill, 50 gold or beat it\r\n1. Beat it\r\n 2. Here's the gold",
            "Hey, what do you know, you actually found 50 gold!\r\n You'll make a fine adventurer yet. Unfortunately,\r\nwe are sold out of quests right now, come back\r\ntommorrow\r\n1. Take a deep breath and walk away\r\n2. Resort to violence"
        ];

        this.t1 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[0], 8);
        this.t1.visible = false;

        this.t2 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[1], 8);
        this.t2.visible = false;

        this.t3 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[2], 8);
        this.t3.visible = false;

        this.t4 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[3], 8);
        this.t4.visible = false;

        this.t5 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[4], 8);
        this.t5.visible = false;

        this.t6 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[5], 8);
        this.t6.visible = false;

        this.t7 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[6], 8);
        this.t7.visible = false;

        this.t8 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[7], 8);
        this.t8.visible = false;

        this.t9 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.guildText[8], 8);
        this.t9.visible = false;

        this.bartenderText = [
            "Hi Hun, what'll ya have?\r\n1. Can I have an empty bottle?\r\n2. Nothing right now, thanks",
            "Well, I suppose. Don't say I never do anything nice for\r\nyou!\r\n1. Thanks",
            "Hi Hun, what'll ya have?\r\n1. Nothing right now, thanks"
        ];

        this.b1 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.bartenderText[0], 8);
        this.b1.visible = false;

        this.b2 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.bartenderText[1], 8);
        this.b2.visible = false;

        this.b3 = this.add.bitmapText(my.sprite.textBox.x-145, my.sprite.textBox.y-25, 
            "rocketSquare",this.bartenderText[2], 8);
        this.b3.visible = false;
        
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
            my.sprite.textBox.y = Math.max(my.sprite.purpleTownie.y - 65, 35);
        } else {
            if(this.zone == "quests"){
                this.questText();
            } else if(this.zone == "bar"){
                this.barText();
            }
            this.talkBuffer++;
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    questText() {
        if(questState == 0){
            if(this.guildLine == 0){ // Adventureres wanted
                this.t1.y = my.sprite.textBox.y-25;
                this.t1.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // give me a quest
                    this.talkBuffer = 0;
                    this.guildLine = 1;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // leave
                    this.t1.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.guildLine == 1){ // let me see your ID
                this.t1.visible = false;
                this.t2.y = my.sprite.textBox.y-25;
                this.t2.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // I have no ID
                    this.talkBuffer = 0;
                    this.guildLine = 2;
                } else {

                }
            } else if(this.guildLine == 2){ // you must join to quest
                this.t2.visible = false;
                this.t3.y = my.sprite.textBox.y-25;
                this.t3.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // i'll join
                    this.talkBuffer = 0;
                    this.guildLine = 3;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // make an exception
                    this.talkBuffer = 0;
                    this.guildLine = 4;
                } else {

                }
            } else if(this.guildLine == 3){ // give me 50 gold
                this.t3.visible = false;
                this.t5.visible = false;
                this.t4.y = my.sprite.textBox.y-25;
                this.t4.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // don't have 50 gold
                    this.talkBuffer = 0;
                    this.guildLine = 5;
                } else {

                }
            } else if(this.guildLine == 4){ // can't make exception
                this.t3.visible = false;
                this.t5.y = my.sprite.textBox.y-25;
                this.t5.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // i'll join
                    this.talkBuffer = 0;
                    this.guildLine = 3;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // leave
                    this.t5.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.guildLine == 5){ // come back when you're richer
                this.t4.visible = false;
                this.t6.y = my.sprite.textBox.y-25;
                this.t6.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // fine
                    this.t6.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                    questState = 1;
                } else {

                }
            }
        } else if(questState < 6){ // 50 gold or beat it (don't have it)
            this.t7.y = my.sprite.textBox.y-25;
            this.t7.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // beat it
                this.t7.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else if(questState == 6){ // wow, you did it
            this.t9.y = my.sprite.textBox.y-25;
            this.t9.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // walk away peacefully
                this.scene.start("creditsScene");
            } else if(this.option2.isDown && this.talkBuffer > 30){ // resort to violence
                this.sound.play("attack", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                this.scene.start("creditsScene");
            } else {

            }
        }
    }

    barText() {
        if(questState != 2){ // Want a drink
            this.b3.y = my.sprite.textBox.y-25;
            this.b3.visible = true;
            if(this.option1.isDown && this.talkBuffer > 30){ // No thanks
                this.b3.visible = false;
                my.sprite.textBox.visible = false;
                this.talking = false;
            } else {

            }
        } else {
            if(this.barLine == 0){ // Want a drink
                this.b1.y = my.sprite.textBox.y-25;
                this.b1.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // can i have a bottle
                    this.talkBuffer = 0;
                    this.barLine = 1;
                } else if(this.option2.isDown && this.talkBuffer > 30){ // no thanks
                    this.b1.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                } else {

                }
            } else if(this.barLine == 1){ // Want a drink
                this.b1.visible = false;
                this.b2.y = my.sprite.textBox.y-25;
                this.b2.visible = true;
                if(this.option1.isDown && this.talkBuffer > 30){ // thank you
                    this.b2.visible = false;
                    my.sprite.textBox.visible = false;
                    this.talking = false;
                    questState = 3;
                } else {

                }
            }
        }
    }

}

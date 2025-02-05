// Jim Whitehead
// Created: 5/26/2024
// Phaser: 3.80.0
//
// Pathfinder demo
//
// An example of pathfinding in Phaser using the EasyStar.js pathfinder 
// https://github.com/prettymuchbryce/easystarjs
// 
// Assets from the following Kenney Asset packs
// Tiny Dungeon
// https://kenney.nl/assets/tiny-dungeon
//
// Tiny Town
// https://kenney.nl/assets/tiny-town
//


// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1280,
    height: 800,
    scene: [Load, Town, Blacksmith, Church, Cleric, Tavern, Credits, Start],
    fps: { forceSetTimeOut: true, target: 30 }
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}};
var exitX = 0;
var exitY = 0;
var questState = 0;
var flower = false;
var secret = false;
var tearquestState = 0;

const game = new Phaser.Game(config);
var express = require('express');
var instructions = require('./json/instructions.json');
var lightDecorationsUtils = require('./lightDecorations.utils');
var santaTourUtils = require('./santaTour.utils');
var app = express();

var GRID_CONFIG = {
    LENGTH_X: 1000,
    LENGTH_Y: 1000
};

var listOfLocations = [
    'alphaCentauri',
    'snowdin',
    'tambi',
    'faerun',
    'norrath',
    'straylight',
    'tristram',
    'arbre'
];

var server = app.listen(5000, function () {
    console.log('listening port 5000: Node server is running.. ');
    console.log('\n');

    /**
     * LIGHT DECORATIONS:
     */
    console.log('----------------------------------------------');
    console.log('LIGHT DECORATIONS:');
    console.log('----------------------------------------------');
    // format instructions into object with relevant pieces of information so we can handle them later on
    var formattedInstructions = lightDecorationsUtils.extractInstructions(instructions);
    // create grid
    var grid = lightDecorationsUtils.createGrid();

    // apply one by one each instruction to the grid
    for (var i = 0; i < formattedInstructions.length; i++) {
        // console.log('>>> formattedInstructions[i]', formattedInstructions[i]);
        grid = lightDecorationsUtils.updateGrid(grid, formattedInstructions[i]);
    }

    // count number of lit candles/decorations by looping over the updated grid
    var counter = 0;
    for (var i = 0; i < GRID_CONFIG.LENGTH_X; i++) {
        for (var j = 0; j < GRID_CONFIG.LENGTH_Y; j++) {
            counter = grid[i][j].active ? counter + 1 : counter;
        }
    }
    console.log('>>> Lit candle counter:', counter);
    console.log('\n');

    /**
     * SANTA TOUR:
     */
    console.log('----------------------------------------------');
    console.log('SANTA TOUR:');
    console.log('----------------------------------------------');

    // calculate all different path (8! expected results)
    santaTourUtils.calculatePaths('', 0, '', listOfLocations);


    var allPossiblePaths = santaTourUtils.getAllPossiblePaths();
    // sort them in order to have shortest paths as first elements of allPossiblePaths array
    allPossiblePaths.sort(function (path1, path2) {
        return path1.distance - path2.distance;
    });

    // here we only show the first 2 results as the distance for others is greater than these two
    console.log('>>> First 2 shortest paths:', allPossiblePaths.slice(0, 2));
    // console.log('>>> all paths:', allPossiblePaths);
    console.log('\n');
});
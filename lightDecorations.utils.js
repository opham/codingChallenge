var INSTRUCTION_TYPES = {
    TOGGLE: 'toggle',
    TURN_ON: 'turn on',
    TURN_OFF: 'turn off',
};

var GRID_CONFIG = {
    LENGTH_X: 1000,
    LENGTH_Y: 1000
};

var DEFAULT_CANDLE = {
    active: false
};

var DEFAULT_FORMATTED_INSTRUCTION = {
    startingPoint: {x: 0, y: 0},
    endingPoint: {x: 0, y: 0},
    type: ''
};


function extractInstructions(instructions) {
    var formattedInstructions = [];

    for (var i = 0; i < instructions.length; i++) {
        var newInstruction = Object.assign({}, DEFAULT_FORMATTED_INSTRUCTION);
        var currentInstruction = instructions[i];
        var match = currentInstruction.match(/(toggle|turn on|turn off) ([0-9]{1,3},[0-9]{1,3}) through ([0-9]{1,3},[0-9]{1,3})/i);

        newInstruction.type = match[1]; // first match is type
        newInstruction.startingPoint = extractCoordinates(match[2]); // second match is startingPoint
        newInstruction.endingPoint = extractCoordinates(match[3]); // third match is endingPoint

        formattedInstructions.push(newInstruction);
    }

    return formattedInstructions;
}

function extractCoordinates(pointString) {

    var match = pointString.match(/([0-9]{1,3}),([0-9]{1,3})/i); // extract coordinates
    return {
        x: parseInt(match[1], 10),
        y: parseInt(match[2], 10)
    };
}


function createGrid() {
    var grid = new Array(GRID_CONFIG.LENGTH_X);

    for (var i = 0; i < GRID_CONFIG.LENGTH_X; i++) {
        grid[i] = new Array(GRID_CONFIG.LENGTH_Y);

        for (var j = 0; j < GRID_CONFIG.LENGTH_Y; j++) {
            // creating grid with default values for each candles
            grid[i][j] = Object.assign({}, DEFAULT_CANDLE);
        }
    }
    return grid;
}

function updateGrid(grid, instruction) {
    var updatedGrid = grid;
    for (var i = instruction.startingPoint.x; i <= instruction.endingPoint.x; i++) {
        for (var j = instruction.startingPoint.y; j <= instruction.endingPoint.y; j++) {
            switch (instruction.type) {
            case INSTRUCTION_TYPES.TOGGLE:
                updatedGrid[i][j].active = !updatedGrid[i][j].active;
                break;
            case INSTRUCTION_TYPES.TURN_ON:
                updatedGrid[i][j].active = true;
                break;
            case INSTRUCTION_TYPES.TURN_OFF:
                updatedGrid[i][j].active = false;
                break;
            default:
                break;
            }

        }
    }
    return updatedGrid;
}

exports.createGrid = createGrid;
exports.extractInstructions = extractInstructions;
exports.updateGrid = updateGrid;

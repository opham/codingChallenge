var distanceMap = require('./json/distanceMap.json');

var allPossiblePaths = [];

function getAllPossiblePaths () {
    return allPossiblePaths;
}


function calculatePaths(currentPath, currentDistance, currentLocation, remainingLocations) {
    if (remainingLocations.length === 1) {
        // meaning that we reached the last value of a possible path
        var newPossiblePath = {
            path: currentPath + '->' + remainingLocations[0],
            distance: currentDistance + distanceMap[currentLocation][remainingLocations[0]]
        };
        allPossiblePaths.push(newPossiblePath);
    } else {
        for (var i = 0; i < remainingLocations.length; i++) {
            var newPath = currentPath ? currentPath + '->' + remainingLocations[i] : remainingLocations[i];
            var newLocation = remainingLocations[i];
            var newDistance = currentLocation && newLocation ? currentDistance + distanceMap[currentLocation][newLocation] : currentDistance;

            var indexToRemove = remainingLocations.indexOf(newLocation);
            if (indexToRemove > -1) {
                var newRemainingLocations = remainingLocations.slice();
                newRemainingLocations.splice(indexToRemove, 1);
                calculatePaths(newPath, newDistance, newLocation, newRemainingLocations);
            } else {
                console.error('error when looking for location to remove');
            }
        }
    }

}

exports.calculatePaths = calculatePaths;
exports.getAllPossiblePaths = getAllPossiblePaths;


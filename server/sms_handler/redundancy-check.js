/**
 * @author Luis Arias
 * Last Edited: 06/08/2015
 * Description: Check to see if paths are within the range of the drones' distance.
 */

exports.sendPackage = function (path, drone) {

    var pathDistance = path.distance;
    var duration = drone.duration;
    var droneSpeed = drone.speed;
    var maxDistance = droneSpeed * duration;

    return (maxDistance > pathDistance);
};
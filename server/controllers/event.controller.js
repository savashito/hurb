/**
 * @author Leo Galante y Sergio Herrera
 * Last Edited: 01/07/2015
 * Description: Stack that contains events interrupts for updateing the grid
 */

var grid = require('../controllers/grid.controller');

exports.schedule = function (zone) {
    // body...
    var zoneType = zone.zoneType;
    // dynamic schedule value
    var zoneSchedule = zoneType.schedule;

    if (zoneSchedule) {
        var currentTime = getCurrentTime();
        for (var i = zoneSchedule.length - 1; i >= 0; i--) {
            var evento = zoneSchedule[i];
            var start = getTimeObj(evento.start);
            var end = getTimeObj(evento.end);
            // var value = evento.value;

            var milisecStart = calcDifferenceMiliseconds(currentTime, start);
            var milisecEnd = calcDifferenceMiliseconds(currentTime, end);
            console.log('Mili S', milisecStart);
            console.log('Mili E', milisecEnd);

            setTimeout(function () {
                console.log("Event Starts at ", getCurrentTime());
                // update zone in back end and front end
                grid.updateTemporal(zone, evento.value);

            }, milisecStart);

            setTimeout(function () {
                console.log("Event ends at ", getCurrentTime());
                grid.updateTemporal(zone, -evento.value);

            }, milisecEnd);
        }
    }

};

var testCalcDifferenceMiliseconds = function () {

};
var calcDifferenceMiliseconds = function (serverTime, eventTime) {
    var hours = eventTime.h - serverTime.h;
    var min = eventTime.m - serverTime.m;
    var difMin = min * 1000 * 60;
    var difHours = hours * 1000 * 60 * 60;
    var dif = difMin + difHours;
    console.log("Differnece ", dif);

    return dif;
    // return dif * 60 * 60 * 1000;
};
var getTimeObj = function (time) {
    return {h: time};
};
var getCurrentTime = function () {
    var date = new Date();
    var current_hour = date.getHours();
    var minutes = date.getMinutes();
    return {h: minutes, m: minutes};
};

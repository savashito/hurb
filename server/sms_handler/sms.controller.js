/**
 * @author Jake Hewitt
 * Last Edited: 06/08/2015
 * Description: Handles send SMS packets
 */

var plivo = require('plivo-node');
var api = plivo.RestAPI(require('./config'));
var Drone = require("../models/drone.model").Drone;


var params = {
    'src': '13303496524', // Caller Id
    'dst': '000000', // User Number to Call
    'text': "Message is undefined"
};

// Takes in a source number, destination number, and a message to send
var sendSMS = function (destination, message, source) {
    if (destination && message) {
        if (source)
            params.src = source;
        params.dst = destination;
        // TODO: check message validity
        params.text = message;
    }

    api.send_message(params, function (status, response) {
        console.log('Status: ', status);
        if (status != 202) {
            // TODO: Implement error logging
        }
        console.log('API Response:\n', response);
    });
};

var receiveSMS = function (req, res) {
    sendSMS(14804150471, req.body.Text, 13303496524);
    console.log("Data from drone1: ", req.body.Text);
    var messageText = req.body.Text;
    var messageFrom = req.body.From;
    decodeSMS(messageText, messageFrom);
    res.sendStatus(200);
};

// Encodes the data to be sent to the drone
var encodeSMS = function (messageType, content, verbose) {
    switch(messageType){
        case 2:
            return encodeWaypoints(content, verbose);
            break;
        case 3:
            sendParamRequest(content, verbose);
            break;
        case 7:
            sendRedirect(content, verbose);
            break;
    }
};

var encodeWaypoints = function(content, verbose) {
    var message = "02";
    readableChar = '';
    if (verbose)
        var readableChar = ' ';
    var index;
    for (index = 0; index < content.length; ++index) {
        var entry = content[index];
        message += ("00" + floatToHex(entry.sequence)).slice(-2) + readableChar;
        message += ("00000000" + floatToHex(entry.latitude)).slice(-8) + readableChar;
        message += ("00000000" + floatToHex(entry.longitude)).slice(-8) + readableChar;
        message += ("00000000" + floatToHex(entry.altitude)).slice(-8) + readableChar;
        message += ("00" + floatToHex(entry.waitTime)).slice(-2) + readableChar;
        message += ("00" + floatToHex(entry.textSeq)).slice(-2) + readableChar;
        message += ("00" + floatToHex(entry.shouldContinue)).slice(-2) + readableChar;
        if (verbose)
            message += '\n';
    }
    return message;
};

var sendParamRequest = function(content, verbose){
    console.log("Sending parameter request");
};

var sendRedirect = function(content, verbose){
    console.log("Sending redirect");
};

// Decodes the data from the drone
var decodeSMS = function (messageText, messageFrom) {
    console.log("Data from drone2: ", messageText);
    var messageType = hexToFloat(messageText.substring(0, 1));
    switch (messageType) {
        case 0:
            console.log("Null message received");
            break;
        case 1:
            var droneStatus = decodeDroneStatus(messageText);
            // TODO : Throw error if drone does not exist
            Drone.findOne({phone: messageFrom}).exec(function (err, drone) {
                drone.location.latitude = droneStatus.latitude;
                drone.location.longitude = droneStatus.longitude;
                drone.altitude = droneStatus.altitude;
                drone.save();
                //res.sendStatus(200);
            });
            break;
        case 4:
            RequestToLand();
            break;
        case 5:
            DroneEmergency();
            break;
        case 6:
            DroneError();
            break;
        case 8:
            DroneFinalWaypoint();
            break;
        default:
            console.log("Error: The message identifier ", messageType, " is not valid.");
    }
};

var decodeDroneStatus = function (droneData) {
    var latitude = hexToFloat(droneData.substring(1, 9));
    var longitude = hexToFloat(droneData.substring(9, 17));
    var altitude = ((hexToFloat(droneData.substring(17, 25)) * 10000) + .000001).toPrecision(9);
    var batteryVolt = hexToFloat(droneData.substring(25, 29));
    var batteryCurrent = hexToFloat(droneData.substring(29, 31));
    var batteryLeft = hexToFloat(droneData.substring(31, 33));
    content = {
        "latitude": latitude,
        "longitude": longitude,
        "altitude": altitude,
        "batteryVolt": batteryVolt,
        "batteryCurrent": batteryCurrent,
        "batteryLeft": batteryLeft
    };
    console.log("Parsed data from drone: ", content);
    return content;
};

var RequestToLand = function () {
    console.log("Request To Land message received");
};

var DroneEmergency = function () {
    console.log("Drone Emergency message received");
};

var DroneError = function () {
    console.log("Drone Error message received");
};

var DroneFinalWaypoint = function () {
    console.log("Drone Final Waypoint message received");
};


// This is just a tool for checking the validity of send messages
// TODO: Move this into a tools/utilities folder
var decodeSentSMS = function (waypoints) {
    var hasNext = 1;
    var content = [];
    while (hasNext) {
        var waypoint = {
            "type": hexToFloat(waypoints.substring(0, 1)),
            "sequence": hexToFloat(waypoints.substring(1, 3)),
            "latitude": hexToFloat(waypoints.substring(3, 11)),
            "longitude": hexToFloat(waypoints.substring(11, 19)),
            "altitude": (parseFloat(hexToFloat(waypoints.substring(19, 27))) * 10).toPrecision(9),
            "waitTime": hexToFloat(waypoints.substring(27, 29)),
            "textSeq": hexToFloat(waypoints.substring(29, 31)),
            "shouldContinue": hexToFloat(waypoints.substring(31, 33))
        };
        content.push(waypoint);
        hasNext = waypoint.shouldContinue;
        waypoints = waypoints.substring(33);
    }
    return content;
};

// Converts a hex string to a decimal number
var hexToFloat = function (hex) {
    var dec = parseInt(hex, 16) >> 0;
    if (hex.length == 8)
        return (dec / 10000000).toFixed(7);
    return (dec);

};

// Converts decimal numbers to hex strings
function floatToHex(number) {
    var stringified = number + '';
    stringified = stringified.replace('.', '');
    number = parseInt(stringified);
    if (number < 0)
        number = 0xFFFFFFFF + number + 1;

    return number.toString(16);
}

module.exports = {
    sendSMS: sendSMS,
    receiveSMS: receiveSMS,
    encodeSMS: encodeSMS,
    decodeSMS: decodeSMS,
    decodeSentSMS: decodeSentSMS
};

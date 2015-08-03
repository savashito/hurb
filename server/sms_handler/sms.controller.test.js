/**
 * @author Jake Hewitt
 * Description:
 */

var smshandler = require('./sms.controller');

var xmlFormat = function (content) {
    var result = "latitude, longitude\n";
    for (var i = 0; i < content.length; i++) {
        result += content[i].latitude;
        result += ", ";
        result += content[i].longitude;
        result += '\n';
    }
    return result;
};

smshandler.decodeSMS('1136ffd73bda657b90008cdc92f3f0b4e');
//content = smshandler.decodeSentSMS('001335894bbddb8ea92beefe790101010113357c7dbddbac552beefe7901010102133590edbddb91172beefe79010100');
//console.log(content);
//console.log(xmlFormat(content));
//
// latitude, longitude
// 32.60950, -111.31950
// 32.61250, -111.31650

//var startLat = 32.60950;
//var startLon = -111.31950;
//var result = "latitude, longitude\n";
//for (var i = 0; i < 100; i++){
//    var tempLat =  (startLat + (i*3)/100000);
//    for (var j = 0; j < 100; j++){
//        result += tempLat.toPrecision(7);
//        result += ', ';
//        var tempLon = (startLon + (j*3)/100000);
//        result += tempLon.toPrecision(8);
//        result += "\n"
//    }
//    //result += '\n\n';
//
//}
//console.log(result);
//var items = [[1,2],[3,4],[5,6]];
//console.log(items);
//content = [
//    {
//        "sequence": 0,
//        "latitude": "32.6106000",
//        "longitude": "-111.3172300",
//        "altitude": "610.123456",
//        "waitTime": "1",
//        "textSeq": "1",
//        "shouldContinue": "1"
//    },
//    {
//        "sequence": 1,
//        "latitude": "32.6106800",
//        "longitude": "-111.3171400",
//        "altitude": "610.234567",
//        "waitTime": "1",
//        "textSeq": "1",
//        "shouldContinue": "0"
//    },
//];

//{"sequence": 0, "latitude":"32.2275233", "longitude":"-110.9684818", "altitude":"1.0723354", "waitTime":"1", "textSeq":"1", "shouldContinue":"1"},
//{"sequence": 1, "latitude":"32.2275233", "longitude":"-110.9850000", "altitude":"0.0723354", "waitTime":"1", "textSeq":"1", "shouldContinue":"1"},
//{"sequence": 2, "latitude":"32.2275233", "longitude":"-111.0000000", "altitude":"0.0723354", "waitTime":"1", "textSeq":"1", "shouldContinue":"0"}

//var message = smshandler.encodeSMS(content, false);
//smshandler.sendSMS(14804150471,  message, 13303496524);
//smshandler.sendSMS(16128496138,  message, 13303496524);

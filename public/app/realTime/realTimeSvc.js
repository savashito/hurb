/**
 * @author Luis Arias and Rodrigo Savage
 * Last Edited: 06/16/2015
 * Description: Socket service
 */

angular.module('app').factory('socket', function ($rootScope) {
    var socket = io();

    var on = function (eventName, callback) {
        socket.on(eventName, function () {  
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
    }

    var emit = function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        })
    }

    return { on: on, emit: emit}
});
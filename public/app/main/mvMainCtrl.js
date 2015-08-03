/**
 * @author Luis    Arias
 * Last Edited: 06/11/2015
 * Description: Cotrolloer for send location
 */
var app = angular.module('app');

app.controller('mvMainCtrl', function ($scope, $rootScope, $location, mvIdentity, mvUser, requestDrone) {

    $scope.requestDrone = function () {
        var drone = new requestDrone();
        // drone.location = {location: {longitude:-110.96602320671082,latitude:32.227949970166414}};
        drone.location = $scope.user.location;//{longitude:-110.95993995666504,latitude:32.22775030063673};
        // drone.location = {longitude:-110.96609830856323,latitude:32.226697490407915};
        getLocation();
        /*
         debugger
         drone.$save(function(responce){
         debugger
         console.log('drone.save',responce);
         });
         */

        $rootScope.guey = drone.$save(
            /*function(res){
             console.log('drone.post',res);
             }*/
        );

        // var promesa = drone.$save();
        // console.log('promesa',promesa);
        $location.path('/user/map');

    };

    $scope.isLogin = function () {

        if (!mvIdentity.isAuthenticated()) {
            alert('You need Log in');
        } else {
            // parent.location='/';
            $scope.user = mvUser.get({id: mvIdentity.currentUser.username},
                function () {
                    getLocation();
                });
        }
    };
    var getLocation = function () {
        console.log('get locatiom');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.user = {};
                $scope.user.location = {};
                $scope.user.location.longitude = position.coords.longitude;
                // $scope.user.location.longitude = 0;
                $scope.user.location.latitude = position.coords.latitude;
                // $scope.user.location.latitude = 0;
                //$scope.user.$update();
                console.log($scope.user.location);
            });

        } else {
            console.log('Error');
        }
    };
    getLocation();
});

app.controller('AppCtrl', function ($http, $scope, $mdDialog, $location, $mdSidenav, mvIdentity, mvAuth, mvNotifier) {

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    //$scope.onSwipeLeft = function (menuId) {
    //    $mdSidenav(menuId).open();
    //};
    //
    //$scope.onSwipeRight = function (menuId) {
    //    $mdSidenav(menuId).close();
    //};

    $scope.identity = mvIdentity;

    $scope.pages = [
        {label: 'Map', img: 'map', page: 'admin/map'},
        {label: 'Orders', img: 'receipt', page: 'main/orders'},
        {label: 'Drones', img: 'flight', page: 'main/drones'},
        {label: 'ABM', img: 'flare', page: 'main/abms'}
    ];

    $scope.goToPerson = function (person, event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Navigating')
                .content('Inspect ' + person)
                .ariaLabel('Person inspect demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

    $scope.showAdvanced = function (ev) {
        console.log("Event name: ", ev.currentTarget.name);
        var template = 'app/main/notfound.html';
        if (ev.currentTarget.name == "signin")
            template = 'app/main/login.html';
        if (ev.currentTarget.name == "edit")
            template = 'app/main/user.edit.html';
        $mdDialog.show({
            templateUrl: template,
            parent: angular.element(document.body),
            scope: $scope,
            preserveScope: true,
            targetEvent: ev,
            controller: DialogController
        }).then(function (answer) {
            //$scope.user.email = answer.email;
            //printUser(answer);
            // TODO: update user in db
        }, function () {
            console.log('Cancelled');
        });
    };

    //function printUser(answer) {
    //    var newUseraData = {
    //        name: answer.name,
    //        img: answer.img,
    //        phone: answer.phone,
    //        email: answer.email,
    //        address: answer.address,
    //        city: answer.city,
    //        state: answer.state,
    //        postalCode: answer.postalCode
    //    };
    //    console.log(newUseraData);
    //    $scope.user = newUseraData;
    //
    //}

    function DialogController($scope, $mdDialog, mvAuth) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    $scope.navigateTo = function (menuId, to) {
        $mdSidenav(menuId).close();
        $location.path('/' + to);
    };

    $scope.doSecondaryAction = function (event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Secondary Action')
                .content('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

});

app.controller('OrderCtrl', function ($scope) {
    $scope.orders = [{
        "_id": "55933accbd04fe1c46fbd5ba",
        orderNum: "6245-4856-7741",
        "timeWindow": 30,
        "status": "Delivered",
        "sender": "556e06662a6efc6c2544773b",
        "receiver": "Alton Wells",
        "timeDelivered": "07-04-2015 1:34 PM",
        "timePlaced": "07-04-2015 1:22 PM",
        "packageDimensions": {
            "height": 3,
            "width": 3,
            "weight": 5
        },
        "__v": 0
    },
        {
            "_id": "55933accbd04fe1c46fbd5bb",
            orderNum: "2648-5234-3546",
            "timeWindow": 90,
            "status": "Delivered",
            "sender": "556e06662a6efc6c2544773b",
            "receiver": "Nick Morin",
            "timeDelivered": "07-04-2015 12:08 PM",
            "timePlaced": "07-04-2015 11:49 PM",
            "packageDimensions": {
                "height": 5,
                "width": 7,
                "weight": 8
            },
            "__v": 0
        },
        {
            "_id": "55933accbd04fe1c46fbd5bc",
            orderNum: "6861-4214-3998",
            "timeWindow": 30,
            "status": "Delivered",
            "sender": "556e06662a6efc6c2544773b",
            "receiver": "Rodrigo Savage",
            "timeDelivered": "07-01-2015 2:56 PM",
            "timePlaced": "07-01-2015 2:42 PM",
            "packageDimensions": {
                "height": 3,
                "width": 3,
                "weight": 5
            },
            "__v": 0
        }
    ]


});

app.controller('DroneCtrl', function ($scope) {
    $scope.drones = [{
        "_id": "55933accbd04fe1c46fbd5b8",
        "name" : "Apollo",
        "status": "Grounded",
        "battery" : 0,
        "life": 100,
        "speed": 0,
        "altitude" : 710.0001245,
        "phone" : 16123609716,
        "location" : {
            "longitude" : -110.9674782,
            "latitude" : 32.2270338
        },

        "__v": 0
    },
    {
        "_id": "55933accbd04fe1c46fbd5b9",
        "name" : "Apollo2",
        "status": "Grounded",
        "battery" : 0,
        "life": 100,
        "speed": 0,
        "altitude" : 710.0001245,
        "phone" : 16128496138,
        "location" : {
            "longitude" : -111.3172301,
            "latitude" : 32.6106001
        },

        "__v": 0
    }]

});

app.controller('AbmCtrl', function ($scope) {
    $scope.abms = [{
        "_id": "Unit 1",
        "status": "Offline",
        "battery" : 0,
        "available": false,
        "location" : {
            "longitude" : 0,
            "latitude" : 0
        },

        "__v": 0
    },
        {
            "_id": "Unit 2",
            "status": "Offline",
            "battery" : 0,
            "available": false,
            "location" : {
                "longitude" : 0,
                "latitude" :0
            },

            "__v": 0
        }]

});

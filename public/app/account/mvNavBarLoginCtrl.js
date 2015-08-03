angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, mvIdentity, mvNotifier, mvAuth, $location, $mdDialog, $mdSidenav) {

    $scope.identity = mvIdentity;

    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function (success) {
                if (success) {
                    mvNotifier.success("You have successfully signed in!");
                    if ($scope.identity.isAuthorized('admin'))
                        $location.path('/admin/map');
                    else
                        $location.path('/user');
                } else {
                    mvNotifier.error("Username/Password combination incorrect");
                }
            });
        $mdDialog.hide();
    };

    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
                mvNotifier.success('You have successfully signed out!');
                $location.path('/');
                $scope.username = "";
                $scope.password = "";


            });
        $mdSidenav('right').toggle();
    }
});

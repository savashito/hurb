angular.module('app').controller('mvSignupCtrl', function ($scope, $location, mvAuth, mvNotifier, mvUser, $mdDialog) {

    $scope.signup = function () {
        // TODO: Add other vars
        var newUserData = {
            username: $scope.email,
            name: $scope.name,
            password: $scope.password,
            phone: $scope.phone,
            address: $scope.address,
            city: $scope.city,
            state: $scope.state,
            postalCode: $scope.postalCode
        };

        mvAuth.createUser(newUserData).then(function () {
            $mdDialog.hide();
            mvNotifier.success('User account created');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
});

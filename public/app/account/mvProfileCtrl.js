angular.module('app').controller('mvProfileCtrl', function ($scope, mvIdentity, mvAuth, mvNotifier, mvUser, $mdDialog) {

    // TODO: Add all user values
    $scope.email = mvIdentity.currentUser.username;
    $scope.name = mvIdentity.currentUser.name;

    $scope.update = function () {
        var newUserData = {
            email: $scope.identity.currentUser.email,
            name: $scope.identity.currentUser.name,
            phone: $scope.identity.currentUser.phone,
            address: $scope.identity.currentUser.address,
            city: $scope.identity.currentUser.city,
            state: $scope.identity.currentUser.state,
            postalCode: $scope.identity.currentUser.postalCode
        };

        if ($scope.password && $scope.password.length > 1) {
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.success('Your profile has been updated');
        }, function (reason) {
            mvNotifier.error(reason);
        });
        $mdDialog.hide();
    }

});

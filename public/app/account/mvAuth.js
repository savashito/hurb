angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });
            return deferred.promise;
        },

        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var deferred = $q.defer();

            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },

        updateCurrentUser: function (newUserData) {
            var deferred = $q.defer();
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);

            clone.$update().then(function () {
                mvIdentity.currentUser = clone;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },

        logoutUser: function () {
            var deferred = $q.defer();
            $http.post('/logout', {logout: true})
                .then(function () {
                    mvIdentity.currentUser = undefined;
                    deferred.resolve;
                });
            return deferred.promise;
        },

        authorizeCurrentUser: function (role) {
            if (mvIdentity.isAuthorized(role))
                return true;
            else
                return $q.reject('not authorized');
        },

        authorizeAuthenticatedUser: function () {
            if (mvIdentity.isAuthenticated())
                return true;
            else
                return $q.reject('not authenticated');
        }
    };
});

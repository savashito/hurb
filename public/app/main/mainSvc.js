angular.module('app').factory('mainSvc', function ($resource) {

    return $resource('/api/users/:id', {id: '@username'}, {
        update: {
            method: 'PUT'
            // toArray: false
            // toArray: true
        }
    });
});
angular.module('app').factory('mvUser', function ($resource) {

	var UserResource = $resource('/api/users/:id', {id: "@username"}, {
		update: {
			method: 'PUT',
			isArray: false
		}
	});

    UserResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

	UserResource.prototype.isSuper = function () {
		return this.roles && this.roles.indexOf('super') > -1;
	};

    return UserResource;
});

"use strict";

angular.module('app', ['ngResource', 'ngRoute', 'uiGmapgoogle-maps', 'ui.bootstrap', 'ng-context-menu', 'ngMaterial']);
// [review] This should be moved to its own 
var routeRoleCheck = {
    admin: {
        auth: function (mvAuth, $q) {
            return mvAuth.authorizeCurrentUser('admin')
        }
    },
    user: {
        auth: function (mvAuth, $q) {
            return mvAuth.authorizeAuthenticatedUser()
        }
    }
};

angular.module('app').config(function ($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey')
        .warnPalette('red')
        .backgroundPalette('grey', {
            'default': '50', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100' // use shade 100 for the <code>md-hue-1</code> class
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
       .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'AppCtrl'
        })
        .when('/socket', {
            templateUrl: '/partials/realTime/real',
            controller: 'realTimeCtrl'
        })
        .when('/sendLocation/:id', {
            templateUrl: '/partials/account/button',
            controller: 'sendLocationCtrl',
            resolve: routeRoleCheck.user
        })
        .when('/user', {
            templateUrl: '/partials/user/user',
            controller: 'userCtrl',
            resolve: routeRoleCheck.user
        })
        .when('/user/map', {
            templateUrl: '/partials/user/userMap/userMap',
            controller: 'userMapCtrl',
            resolve: routeRoleCheck.user
        })
        .when('/main/orders', {
            templateUrl: '/partials/main/orders',
            controller: 'OrderCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/main/drones', {
            templateUrl: '/partials/main/drones',
            controller: 'DroneCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/main/abms', {
            templateUrl: '/partials/main/abm',
            controller: 'AbmCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/map', {
            templateUrl: '/partials/admin/admin',
            controller: 'adminCtrl',
          //  resolve: routeRoleCheck.admin
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/adminUsers/adminUsers',
            controller: 'adminUsersCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/user/add', {
            templateUrl: '/partials/admin/adminUsers/adminUsersAdd',
            controller: 'adminUsersCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/user/update', {
            templateUrl: '/partials/admin/adminUsers/adminUserView',
            controller: 'adminUserViewCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/apollo/clients', {
            templateUrl: '/partials/admin/adminApollo/adminApollo',
            controller: 'adminApolloCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/apollo/clients/:id/view/', {
            templateUrl: '/partials/admin/adminApollo/adminApolloClient/adminApolloClient',
            controller: 'adminApolloClientCtrl'
            // resolve: routeRoleCheck.admin
        })
        // .when('/admin/apollo/clients/view/map', {
        .when('/admin/apollo/clients/:id/view/map', {
            templateUrl: '/partials/admin/adminApollo/adminApolloClient/adminApolloClientMap',
            controller: 'adminApolloClientMapCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/admin/user/:id/view', {
            templateUrl: '/partials/admin/adminUsers/adminUserView',
            controller: 'adminUserViewCtrl',
            resolve: routeRoleCheck.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl',
            resolve: routeRoleCheck.user
        });

    uiGmapGoogleMapApiProvider.configure({
        //
        key: 'AIzaSyCHOnwCoVpBqdAozj2HyT363zab01L2nDk',//k
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });

});

/*
 angular.module('app').config(function( uiGmapGoogleMapApiProvider) {


 });
 */

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

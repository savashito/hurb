/**
 * @author Rodrigo Savage and Luis Arias
 * Last Edited: 11/july/2015
 * Description: service for apollo map
 */
angular.module('app').factory('mapSvc', function ($q) {
	// var map = undefined;
	var res;
	var map = $q(function(resolve,reject){
		res = resolve;
	});

	return {
		getMap:function(){
			return map;
		},
		setMap:function(m){
			map = m;
			res(map);
		},
		map:map
	};
});

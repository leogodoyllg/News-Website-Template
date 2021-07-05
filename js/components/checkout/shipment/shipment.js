angular.module("bookStore").controller("shipmentCtrl", ['$scope','CartService','$routeParams',function($scope, CartService, $routeParams){
	var init= function(){
	
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	init()
}])
angular.module("bookStore").controller("checkoutCtrl", ['$scope','PaymentService','$routeParams',function($scope, PaymentService, $routeParams){
	var init= function(){
		
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	init()
}])
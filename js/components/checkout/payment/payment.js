angular.module("bookStore").controller("paymentCtrl", ['$scope','PaymentService','$routeParams',function($scope, PaymentService, $routeParams){
	var init= function(){
		
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	init()
}])
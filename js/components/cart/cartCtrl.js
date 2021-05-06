angular.module("bookStore").controller("cartCtrl", ['$scope','CartService','$routeParams','$location','$rootScope',function($scope, CartService, $routeParams, $location,$rootScope){
	var init= function(){
		CartService.getCartWithDetails().then(function(res){
			
			$scope.cartData  = CartService.cart =  res.data.cart
		})
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	$scope.checkout = function(){
		$location.path("/checkout/shipment")
	}
	init()

	$scope.removeFromCart= function (item,$index) {
		var operationType= 'delete'
		var data = {
			'operationType':operationType,
			'item':item

		}
		CartService.addItemToCart(data).then(function(res){
			data = res;
			init()
			$rootScope.$broadcast("refreshCart")
		})

	}
}])
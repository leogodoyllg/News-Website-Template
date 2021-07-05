angular.module("bookStore").controller("wishlistCtrl", 
		['$scope','CartService','$routeParams','$location','$rootScope','WishlistService',
		 function($scope, CartService, $routeParams, $location,$rootScope,WishlistService){
			
	var initWishlist= function(){
		$scope.wishlistData.forEach(function(d,i){
			var ratings = calculateRatings(d.rating)
			d.ratingList = ratings
		})
	}
	var init = function(){
		WishlistService.getWishlist().then(function(res){
			$scope.wishlistData = res.data.data
			initWishlist()
		})
	}
	
	var calculateRatings = function(ratings){
		var avg =0;
		var ratingArray= [false,false,false,false,false]
		var total =10;
		if(ratings.length>0){
			ratings.forEach( function(element, index) {
				avg+=element.Score
			});

			avg = parseInt(avg/ratings.length)
		}
		for(i=0;i<avg;i++){
			ratingArray[i] = true
		}
		
		return ratingArray
	}
	
	

	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	$scope.addItemToCart= function(book){
		var data ={'operationType':'add','item':{"isbn":book.isbn, "price":book.price, "quantity":1}}
		CartService.addItemToCart(data).then(function(res){
			data = res;
			$rootScope.$broadcast("refreshCart")
		})
		
	}
	
	

	$scope.removefromWishList= function(book){
		var data ={'operationType':'delete','id':book.id}
		WishlistService.removeFromWishlist(data).then(function(res){
			init()
		})
		
	}

	init()
}])
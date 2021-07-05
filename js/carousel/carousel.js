angular.module("bookStore").directive("carousel",function(){
	return {
		restrict:'EA',
		scope:{
			carouselData:"=carouselData",
			autoSlide:'=autoSlide',
			interval:"=interval",
			limit:'=limit'
		},
		replace:true,
		templateUrl:"/static/js/carousel/carousel.html",
		link:function(scope, element, attrs){
			console.log(scope.carouselData)
		},
		controller:"carouselCtrl"
	}
}).controller("carouselCtrl",['$scope','CartService',function($scope,CartService){
	$scope.stack =[]
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	var initCarousel= function(){
		var numberOfSlides= Math.ceil($scope.carouselData.length/$scope.limit);
		while(true){
			if ($scope.carouselData.length == 0){
				break;
			}
			else if ($scope.carouselData.length<5){
				$scope.stack.push($scope.carouselData.splice(0,$scope.carouselData.length));
				break;
			}
			else{
				$scope.stack.push( $scope.carouselData.splice(0,5));
			}
			
		}
		
		$("#carousel").carousel({
			interval :false,
			pause: $scope.autoSlide
		});
	}
	$scope.$watch("carouselData",function(newVal,oldVal){
		if(newVal!=oldVal){
			initCarousel()
		}
	})
	
	$scope.addItemToCart= function(book){
		var data ={'operationType':'add','item':{"isbn":book.isbn, "price":book.price, "quantity":1}}
		CartService.addItemToCart(data).then(function(res){
			data = res;
			$rootScope.$broadcast("refreshCart")
		})
		
	}
}])
angular.module("bookStore").controller("storeCtrl",['$scope','BookService','StoreService',function($scope,BookService,StoreService){
	$scope.interval = 2000;
	$scope.stack =[]
	$scope.search = {
			'searchText':'',
			'context':'books',
			'searchResult': [],
			'showSearch': false
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
	
	var init= function(){
		
		BookService.getPopularBooks().then(function(res){
			$scope.popularBooks =$scope.carouselData =  res.data.books;
			initCarousel()
		});
		
		StoreService.allBooks();
		
	}

	
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	// $scope.$watch("carouselData",function(newVal,oldVal){
	// 	if(newVal!=oldVal){
	// 		initCarousel()
	// 	}
	// })
	
	$scope.addItemToCart= function(book){
		var data ={'operationType':'add','item':{"isbn":book.isbn, "price":book.price, "quantity":1}}
		CartService.addItemToCart(data).then(function(res){
			data = res;
			$rootScope.$broadcast("refreshCart")
		})
		
	}

	$scope.searchQuery = function(){
		$scope.search.showSearch = true
		if($scope.search.searchText.trim()!= ''){
			BookService.search($scope.search).then(function(res){
				$scope.search.searchResult = res.data.searchResult
			})
		}
	}
	init();
	
}])
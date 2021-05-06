angular.module("bookStore").controller("booksCtrl", ['$scope','$rootScope','BookService',
	'$routeParams','CartService','$sce','$compile','WishlistService',
	function($scope, $rootScope, BookService, $routeParams,CartService,$sce,$compile,WishlistService){
	
	$scope.ratings = []
	$scope.avgRatings = [false,false,false,false,false]

	$scope.sortOpts =['Popularity','Price Low to High','Price High to Low','Latest release']
	$scope.search = {
		'searchText':undefined,
		'context':'books'
	}
	$scope.sortConfig = {
		'selected' :$scope.sortOpts[0]
	}

	$scope.category = {
		'id':undefined,
		'name':undefined
	}
	var calculateRatings = function(){
		var avg =0;
		var total =10;
		if($scope.ratings.length>0){
			$scope.ratings.forEach( function(element, index) {
				avg+=element.Score
			});

			avg = parseInt(avg/$scope.ratings.length)
		}
		for(i=0;i<avg;i++){
			$scope.avgRatings[i] = true
		}
	}


	var initBookInfo = function(){
		BookService.getBookInfo({'isbn':$scope.isbn}).then(function(res){
			$scope.book = res.data.bookData.book;
			$scope.ratings = res.data.bookData.ratings
			calculateRatings()
		})
	}

	
	var initBookList = function(){
		$scope.category.id = $routeParams.categoryid
		$scope.category.name = $routeParams.categoryName
		BookService.getBookBycategory([$routeParams.categoryName, parseInt($routeParams.categoryid)]).then(function(res){
			$scope.bookList = res.data.books;
		})
	}

	$scope.sortBookList= function (index) {
		var params = {};
		$scope.sortConfig.selected= $scope.sortOpts[index]
		if($scope.category.id && $scope.category.name){
			params.filterParam = $scope.category
		}

		if($scope.search.searchText){
			params.searchText = $scope.search.searchText
		}
		params.sortParam = index
		BookService.sortBooks(params).then(function(res){
			$scope.bookList = res.data.result;
		})
	}

	$scope.getDescr= function(row){
		return $sce.trustAsHtml(row);
	}

	var init= function(){
		if($routeParams.isbn){
			$scope.isbn = $routeParams.isbn
			
			initBookInfo()
		}
		else{
			initBookList()
		}
		
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
	
	$scope.$on('categoryLoaded', function(){
		init()
	})	
	$scope.addToWishlist = function(book){
		WishlistService.addToWishList({'operationType':'add','isbn':book.isbn}).then(function(res){
			data = res;
			//$rootScope.$broadcast("refreshCart")
		})
	}

	$scope.searchQuery = function(){
		if($scope.search.searchText.trim()!= ''){
			BookService.search($scope.search).then(function(res){
				$scope.bookList = res.data.searchResult
			})
		}
	}
	init()

	
}])
angular.module("bookStore").controller('headerCtrl',['$scope','CartService',function($scope,CartService){
	
	$scope.showSubList = false;
	$scope.toggleSideBar= function(e){
		$("#book-store-container").toggleClass("toggle-sidebar");
	}

	$scope.openSublist= function(){
		 $('.dropdown-menu').stop( true, true ).fadeIn("fast");
         $('.dropdown').toggleClass('open');
	}

	$scope.closeSublist = function () {
		  $('.dropdown-menu').stop( true, true ).fadeOut("fast");
           $('.dropdown').toggleClass('open');
	}
	
	var getCart= function(){
		CartService.getCartByUser("adit21").then(function(res){
			$scope.cart = res.data.cart;
			CartService.cart = $scope.cart;
		})
	}
	var init = function(){
		getCart();
		$(".dropdown-1").hover(            
            function() {
                $('.sublist').stop( true, true ).fadeIn("fast");
         $('.dropdown-1').toggleClass('open');             
            },
            function() {
                $('.sublist').stop( true, true ).fadeOut("fast");
           $('.dropdown-1').toggleClass('open');            
            });
		
	}
	$scope.$on("refreshCart", function(e,val){
		getCart();
	})
	init();
}])
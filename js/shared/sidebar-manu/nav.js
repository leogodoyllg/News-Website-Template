
angular.module("bookStore").controller('navCtrl',['$scope','SideMenu','CategoryService','$rootScope',
	function($scope, SideMenu, CategoryService, $rootScope) {
	$scope.navigationList = []
	
	$scope.populateNavigationList = function(categories) {
		$scope.navigationList = SideMenu;
	}

	
	var populateCategories= function(list){
		var baseCats = [list.root,
		                {
							children:[],
							data:{
								name:'My orders'
							}},{
							children:[],
							data:{
								name:'Profile'
							}},{
							children:[],
							data:{
								name:'Gift Cards'
							}},{
							children:[],
							data:{
								name:'Wish list'
							}}
		               ]
		var rootCat= {
				children:baseCats,
				data:{
					name:'Menu'
				}
		}
		
		$scope.navigationList=  rootCat
		$rootScope.$broadcast('categoryLoaded')
	}
	
	var init = function() {
		$scope.navigationList ={}
		$scope.populateNavigationList()
		CategoryService.getAllCategories().then(function(res){
				populateCategories(res.data.categoryList)
		})
	}
	
	init()

}])
.directive("collapseList", function(RecursionHelper) {
	return {
		restrict : 'EA',
		scope : {
			navigationList : "=navigationList"
		},
		templateUrl : "/static/js/shared/sidebar-manu/collapse-list.html",
		compile : function(element) {
			return RecursionHelper.compile(element);
		},
		controller:"collapseListCtrl"
	}
}).controller('collapseListCtrl',[ '$scope', 'SideMenu', 'BookService','$location',function($scope, SideMenu, BookService, $location) {
	
	$scope.filterByCategory= function(event, index, category){
		if(category.data.name=='My orders'){
			$location.path('/orders')
			return
		}
		
		if(category.data.name=='Wish list'){
			$location.path('/user/wishlist')
			return
		}
		
		var ids= []
		category.children.forEach(function(d,i) { ids.push(d.data.id)})
		
		$location.path("/bookstore/books/category/"+category.data.id
				+'/'+category.data.name)
	}
	
} ])

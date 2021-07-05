angular.module("bookStore").controller('navCtrl',['$scope','SideMenu',function($scope, SideMenu){
	$scope.navigationList= []
	$scope.populateNavigationList= function(){
		$scope.navigationList = SideMenu;
	}
	
	var init= function(){
		$scope.populateNavigationList()
	}
	init()
}])
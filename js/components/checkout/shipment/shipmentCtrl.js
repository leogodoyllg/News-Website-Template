angular.module("bookStore").controller("shipmentCtrl", ['$scope','CheckoutService','$routeParams','$location','CartService',function($scope, CheckoutService, $routeParams, $location, CartService){
	var init= function(){
		$scope.states = ["Maharashtra","Hariyana","Gujarat","Goa"];
		$scope.countries= ["India","USA","Australia","Pakistan"] 
		$scope.cities=["Mumbai","Surat","kalkatta","Pune","Banglore","Hyderabad"]
		$scope.shipment= {}
		
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	
	$scope.submitShipment = function(e){
		e.stopPropagation()
		e.preventDefault()
		address = new Address($scope.shipment.city, $scope.shipment.state, $scope.shipment.zipcode, $scope.shipment.street, $scope.shipment.building, $scope.shipment.room_no)
		contact = new Contact($scope.shipment.fname, $scope.shipment.lname, $scope.shipment.email, $scope.shipment.phone)
		shipment= new Shipment(address, contact,  new Date().toLocaleString(), null)
		CheckoutService.saveShipmentData(shipment).then(function(res){
			$location.path("/checkout/payment")
		})
		
		
	}
	init()
}])
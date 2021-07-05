angular.module("bookStore").controller("paymentCtrl", ['$scope','$rootScope','PaymentService','CheckoutService','$routeParams','CartService','$uibModal',function($scope,$rootScope, PaymentService,CheckoutService, $routeParams, CartService, $uibModal){
	var init= function(){
		$scope.cardValidator = /^(?:3[47][0-9]{13})$/; 
		$scope.payment = {
			"total":407
		}
		$scope.expMonths = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
		$scope.expYear =[2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
		
	}
	$scope.getImageLocation= function(location){
		return decodeURIComponent(location)
	}
	$scope.replaceCCN = function(dat){

		$scope.payment.cc_num = dat.replace(/(\d{4}(?!\s))/g, "$1 ")
	}
	$scope.open= function(id, message, header){
		$scope.modal ={
				"id":id,
				"message":message,
				"header":header
		}
		$(id).modal()
	}
	$scope.pay = function(e){
		data = {"cart":CartService.cart, "address":CheckoutService.shipment.address, "contact":CheckoutService.shipment.contact}
		PaymentService.pay(data).then(function(res){
		 	data = res.data
			//$scope.open('small',"Success: Congratulations you have successfully placed an order with us your order id is");
			$scope.open("#myModal","Congratulations! you have successfully placed an order for the following item order id is:"+data.order_id + "\nyour item will be arriving by "+data.pd, "Sucess! Thank you for shopping with us.")
			$rootScope.$broadcast("refreshCart");
		})
	}
	init()
}])
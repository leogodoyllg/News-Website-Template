angular.module("bookStore").service("PaymentService",function($q, $http, DataService){
	endPoint="books"
		dataService= DataService
	
	this.pay =  function(data){
		
		var deferred = $q.defer();
		dataService.pay(angular.toJson(data)).then(function(response){
			if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
		return deferred.promise;
	}
})

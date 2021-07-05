angular.module("bookStore").factory("OrderService",
		function($q, $http, DataService) {
			var endPoint = "order"
			var dataService = DataService
			var cart = {}
			var cs = {}

			cs.getOrderDetails = function() {
				var deferred = $q.defer();
				dataService.getOrderDetails().then(function(response) {
					if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
				return deferred.promise;
			}

			

			return cs;

		})

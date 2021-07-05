angular.module("bookStore").factory("StoreService",
		function($q, $http, DataService) {
			var endPoint = "store"
			var dataService = DataService
			var cs= {}

			
			cs.allBooks = function() {
				var deferred = $q.defer();
				dataService.allBooks().then(function(response) {
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

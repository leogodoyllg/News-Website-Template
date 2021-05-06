angular.module("bookStore").factory("CartService",
		function($q, $http, DataService) {
			var endPoint = "books"
			var dataService = DataService
			var cart = {}
			var cs = {}

			/*
			 * @param offset: page number: for example if offset is 0 records
			 * fetched will be 0 - 4 ,if offset is 1 records fetched will be 5-
			 * 9 @return: promise for api @description :cs method will get the
			 * records from audit log according to the offset
			 * 
			 */
			cs.getCartByUser = function(userId) {
				var deferred = $q.defer();
				dataService.getCartByUser(userId).then(function(response) {
					if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
				return deferred.promise;
			}

			cs.addItemToCart = function(item) {
				var deferred = $q.defer();
				dataService.addItemToCart({
					"cart_id" : cs.cart.cart_id,
					"data" : item
				}).then(function(response) {
					bookRepository = response.data;
					if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
				return deferred.promise;
			}
			cs.getCartWithDetails = function(item) {
				var deferred = $q.defer();
				dataService.getCartWithDetails().then(function(response) {
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

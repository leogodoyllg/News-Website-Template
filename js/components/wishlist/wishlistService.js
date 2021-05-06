angular.module("bookStore").factory("WishlistService",
		function($q, $http, DataService) {
			var endPoint = "wishlist"
			var dataService = DataService
			var cs = this

			/*
			 * @param offset: page number: for example if offset is 0 records
			 * fetched will be 0 - 4 ,if offset is 1 records fetched will be 5-
			 * 9 @return: promise for api @description :cs method will get the
			 * records from audit log according to the offset
			 * 
			 */
			cs.getWishlist = function() {
				var deferred = $q.defer();
				dataService.getWishlist().then(function(response) {
					if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
				return deferred.promise;
			}

			cs.addToWishList = function(data) {
				var deferred = $q.defer();
				dataService.addToWishList(data).then(function(response) {
					if (response) {
						deferred.resolve(response);
					} else {
						deferred.reject;
					}
				});
				return deferred.promise;
			}
			cs.removeFromWishlist = function(data) {
				var deferred = $q.defer();
				dataService.removeFromWishlist(data).then(function(response) {
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

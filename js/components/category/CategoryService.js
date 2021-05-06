angular.module("bookStore").service("CategoryService",function($q, $http, DataService){
	endPoint="books"
		dataService= DataService
	/*
	 	@param offset: page number: for example if offset is 0 records fetched will be 0 - 4 ,if offset is 1 records fetched will be 5- 9
	 	@return: promise for api 
	 	@description :this method will get the records from audit log according to the offset
	 	
	 */
	this.getAllCategories =  function(){
		var deferred = $q.defer();
		dataService.getAllCategories().then(function(response){
			if(response){
				deferred.resolve(response);
			}
			else {
				deferred.reject;
			}
		});
		return deferred.promise;
	}


})

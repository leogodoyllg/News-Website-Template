angular.module("bookStore").service("BookService",function($q, $http, DataService){
	var endPoint="books"
		var dataService= DataService
		var bookRepository = []
		var searchContexts = ['books','authors','subject']

	/*
	 	@param offset: page number: for example if offset is 0 records fetched will be 0 - 4 ,if offset is 1 records fetched will be 5- 9
	 	@return: promise for api 
	 	@description :this method will get the records from audit log according to the offset
	 	
	 */
	this.getPopularBooks =  function(){
		var deferred = $q.defer();
		dataService.getPopularBooks().then(function(response){
			if(response){
				deferred.resolve(response);
			}
			else {
				deferred.reject;
			}
		});
		return deferred.promise;
	}
	
	this.getBookBycategory = function(category){
		var deferred = $q.defer();
		dataService.getBooksByCategory(category).then(function(response){
			bookRepository = response.data;
			if(response){
				deferred.resolve(response);
			}
			else {
				deferred.reject;
			}
		});
		return deferred.promise;
	}
	

	this.getBookInfo = function(params){
		var deferred = $q.defer();
		dataService.getBookInfo(params).then(function(response){
			if(response){
				deferred.resolve(response);
			}
			else {
				deferred.reject;
			}
		});
		return deferred.promise;
	}
	
	this.search = function(params){
		var deferred = $q.defer();

		dataService.search(params.searchText, params.context).then(function(response){
			if(response){
				deferred.resolve(response);
			}
			else {
				deferred.reject;
			}
		});
		return deferred.promise;
	}

	this.sortBooks = function (params) {
		 var deferred = $q.defer();
		 dataService.sortBooks(params).then(function(response){
		 	if(response){
		 		deferred.resolve(response);
		 	}
		 	else{
		 		deferred.reject(response)
		 	}
		 })
		 return deferred.promise;
	}

	this.getBookRepository= function(){
		return this.bookRepository
	}


})

angular.module('bookStore').directive('bookList', [
	function () {
	return {
		restrict:'EA',
		scope:{
			books:'=books'
		},
		templateUrl:'static/js/components/books/templates/bookListTmpl.html',
		controller:'booksCtrl',
		link: function (scope, iElement, iAttrs) {
			// scope.$watch('books', function (oldVal, newval) {
			// 	 scope.books = newval
			// }, true)
		}
	};
}])
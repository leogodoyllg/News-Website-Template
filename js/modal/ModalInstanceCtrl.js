angular.module('bookStore').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, message) {

  $scope.message = message;
  /*
	@description :close the model
   */
  $scope.ok = function () {
    $uibModalInstance.close();
  };
  /*
	@description :cancel the model
 */
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
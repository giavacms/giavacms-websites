'use strict';

function ModalInstanceController($scope, $modalInstance, selected) {

  $scope.selected = selected;

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.pick = function (name, item) {
    $scope.selected[name] = item;
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}

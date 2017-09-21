(function(){

angular.module('myAlbomsApp')
  .component('contentEdit', {
    templateUrl: "app/components/alboms-list/content-edit.component.html",
    controller: albomDetailController,
    transclude: true,
    bindings: {
      content: '=',
      onClose: '&',
      onSave: '&',
    }
  });

function albomDetailController() {
  ctrl = this;
  ctrl.close = () => ctrl.onClose();
  ctrl.save = () => ctrl.onSave();
}

})();
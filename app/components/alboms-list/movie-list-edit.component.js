(function(){

angular.module('myAlbomsApp')
  .component('movieListEdit', {
    templateUrl: "app/components/alboms-list/movie-list-edit.component.html",
    controller: movieListEditController,
    transclude: true,
    bindings: {
      content: '=',
      onClose: '&',
    }
  });

function movieListEditController() {
  $ctrl = this;
  $ctrl.close = () => $ctrl.onClose();
}

})();
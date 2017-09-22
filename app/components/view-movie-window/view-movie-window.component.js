(function(){

  angular
    .module('myAlbomsApp')
    .component('viewMovieWindow', 
    {
      templateUrl: "app/components/view-movie-window/view-movie-window.component.html",
      controller: viewMovieController
    })
    .config(viewMovieConfig);

  function viewMovieConfig($stateProvider) {
    $stateProvider.state('view', {
      url: '/view',
      template: '<view-movie-window></view-movie-window>',
      params: {
        movie: null
      }
    });
  }

  function viewMovieController($state){
    var self = this;
    self.movie = $state.params.movie;
  }

})();
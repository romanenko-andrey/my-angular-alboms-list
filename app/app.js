(function(){

    angular.module('myAlbomsApp', [
        'ui.router',
        'ui.bootstrap',
        "ngStorage",
        "ui.bootstrap.modal"
    ])
        .config(myAppConfig)
        .run(myAppRun);

    function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
    }
    
    function myAppRun(){
    }

})();


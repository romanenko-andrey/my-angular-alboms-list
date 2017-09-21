(function(){

  angular.module('myAlbomsApp')
    .component('albomsList', { 
      templateUrl: "app/components/alboms-list/alboms-list.component.html",
      controller: albomsListController
    })
    .config(albomsListConfig);
    
  function albomsListConfig($stateProvider) {
    $stateProvider.state('main', {
      url: '/main',
      template: '<alboms-list></alboms-list>'
    });
  };


  function albomsListController(albomsListService) {

    var self = this;

    self.orderBy = 'name';
    self.sortClass= 'sort-asc';
    self.columns = ['title', 'about', 'size', 'rating'];


   // functions
    self.sort = sort;
    self.close = close;
    self.save = save;
    self.selectAlbom = selectAlbom;
    self.editAlbom = editAlbom;
    self.deleteAlbom = deleteAlbom;
    self.addAlbom = addAlbom;
    self.empty = true;
    self.incorectName = true;
    self.newNameChange = doChange; 

    self.$onInit = function() {
      albomsListService.getAlboms().then(function() {
        self.alboms = albomsListService.alboms;
        self.selectedAlbom = albomsListService.selectedAlbom;
        self.selectedData = albomsListService.saveData();   
        self.alboms.length == 0 ? self.empty = true : self.empty = false;
      });
    };

    function doChange() {
      var nameRegex = /^[0-9a-zA-Zа-яА-Я]+\w*/
      self.incorectName = !nameRegex.test(self.newAlbomName);
    }

    function sort(attribute) {
      self.sortClass = 'sort-asc'; // down arrow
      var newOrderBy = attribute;
      if (self.orderBy === attribute) {
        newOrderBy = '-' + attribute;
        self.sortClass = 'sort-desc'; // up arrow
      }
      self.orderBy = newOrderBy;
    }

    function selectAlbom(albom) {
      self.editedAlbom = undefined; 
      self.selectedAlbom = albomsListService.selectedAlbom = albom;
    }

    function editAlbom(ev, albom){
      ev.stopPropagation();
      self.savedData = albomsListService.saveData(albom);  
      self.editedAlbom = self.selectedAlbom = albomsListService.selectedAlbom = albom;
    }

    function close() {
      if (self.editedAlbom ){
        albomsListService.restoreData(self.savedData);
      }
      self.editedAlbom = undefined;
    }

    function save() {
      self.editedAlbom = undefined;
    }

    function empty() {
      return self.allboms.length === 0
    }

    function deleteAlbom(albom){
      if (!window.confirm("Do you really want to delete it?")) 
        return;
      albomsListService.deleteAlbom(albom);
      self.alboms = albomsListService.alboms;
      self.selectedAlbom = albomsListService.selectedAlbom = undefined;
      self.editedAlbom = undefined;
      self.alboms.length == 0 ? self.empty = true : self.empty = false;
    }

    function addAlbom(){
      albomsListService.addAlbom(self.newAlbomName);
      self.newAlbomName = '';
      self.newNameChange();
      self.empty = false;
    }
  }

})();
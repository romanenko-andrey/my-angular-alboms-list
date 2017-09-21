(function(){

angular.module('myAlbomsApp')
  .component('albomDetail', {
    templateUrl: "app/components/alboms-list/albom-detail.component.html",
    controller: albomDetailController,
    controllerAs: '$ad',
    bindings: {
      albom: '=',
      onClose: '&',
      onSave: '&'
    }
  });

function albomDetailController(albomsListService) {
  var self = this;

  self.close = close;
  self.save = save;

  self.orderBy = 'name';
  self.sortClass= 'sort-asc';
  self.columns = ['title', 'about', 'rating'];

  self.sort = sort;
  self.empty = emptyCheck;

  self.selectMovie = selectMovie;
  self.editMovie = editMovie;
  self.deleteMovie = deleteMovie;
  self.addMovie = addMovie;
  self.incorectName = true;
  self.newNameChange = doChange; 


  function sort(attribute) {
    self.sortClass = 'sort-asc'; // down arrow
    var newOrderBy = attribute;
    if (self.orderBy === attribute) {
      newOrderBy = '-' + attribute;
      self.sortClass = 'sort-desc'; // up arrow
    }
    self.orderBy = newOrderBy;
  }

  function emptyCheck(){
    if (self.albom){
      if (self.albom.list.length === 0)
        return true
    } else {
      return true;
    }
    return false
  }

  function selectMovie(movie) {
    self.editedMovie = undefined; 
    self.selectedMovie = movie;
    self.selectedAlbom = albom;
  }

  function editMovie(ev, movie){
    ev.stopPropagation();
    self.savedData = albomsListService.saveData(albom);  
    self.editedMovie = self.selectedMovie = movie;
  }

  function close() {
    if (self.editedMovie ){
     // albomsListService.restoreData(self.savedData);
     console.log('restore from', self.savedData )
    }
    self.editedAlbom = undefined;
  }

  function save() {
    self.editedAlbom = undefined;
  }


  function deleteMovie(movie){
    console.log('delete', movie);
    //if (!window.confirm("Do you really want to delete it?")) 
    //  return;
    //albomsListService.deleteAlbom(albom);
    //self.alboms = albomsListService.alboms;
    //self.selectedAlbom = albomsListService.selectedAlbom = undefined;
    //self.editedAlbom = undefined;
    //self.alboms.length == 0 ? self.empty = true : self.empty = false;
  }

  function addMovie(){
    console.log('add movie ', self.newMovieName);
    //albomsListService.addAlbom(self.newAlbomName);
    //self.newAlbomName = '';
    //self.newNameChange();
    //self.empty = false;
  }

  function doChange() {
    var nameRegex = /^[0-9a-zA-Zа-яА-Я]+\w*/
    self.incorectName = !nameRegex.test(self.newMovieName);
  }
}

})();
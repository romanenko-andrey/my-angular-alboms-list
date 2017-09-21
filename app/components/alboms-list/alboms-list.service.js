(function () {

    angular.module('myAlbomsApp')
        .service('albomsListService', albomsListService);

    function albomsListService($http, $log, $q) {
        var self = this;

        self.alboms = undefined;
        self.selectedAlbom = undefined;
        self.getAlboms = getAlboms;
        self.saveData = saveData;
        self.restoreData = restoreData;
        self.deleteAlbom = deleteAlbom;
        self.addAlbom = addAlbom;
        self.addMovieToCurrentAlbom = addMovieToCurrentAlbom;


        function getAlboms() {
          var deferred = $q.defer();
          if (self.alboms === undefined) {
            $http.get("resources/alboms.json")
              .then(function (response) {
                $log.log(response);
                self.alboms = response.data;
                self.selectedAlbom = self.alboms[0];
                for (var i = 0; i < self.alboms.length; i++) {
                   self.alboms[i].size = self.alboms[i].list.length
                };

                deferred.resolve(self.alboms);
              }, function(error) {
                $log.error(error);
                deferred.reject(error);
              });
          }
          else {
              deferred.resolve(self.alboms);
          }
          return deferred.promise;
        }

        function saveData(data){
          return JSON.stringify(data)
        }

        function restoreData(savedData){
          data = JSON.parse(savedData)
          self.selectedAlbom.title = data.title;
          self.selectedAlbom.about = data.about;
          self.selectedAlbom.rating = data.rating;
          //self.selectedAlbom.list  = data.list;
          //self.selectedAlbom.size  = data.size;
        }

        function deleteAlbom(albom){
          var copy = [];
          for (var i = 0; i < self.alboms.length; i++) {
             if (self.alboms[i].title != albom.title &&
                self.alboms[i].about != albom.about) 
                  copy.push(self.alboms[i]) 
          };
          self.alboms = copy; 
        }

        function addAlbom(name){
           self.alboms.push({title : name, rating: 0, list : [], size : 0});
        }
        function addMovieToCurrentAlbom(name){
          console.log('currant albom = ',   self.selectedAlbom);
          self.selectedAlbom.list.push({title: name, rating:0});
          self.selectedAlbom.size++;
          console.log('currant albom = ',   self.selectedAlbom);
        }
    }

})();
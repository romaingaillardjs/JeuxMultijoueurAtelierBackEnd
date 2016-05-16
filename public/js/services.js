'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services',[])

.service('ContactService', ['$http', function ($http) {

        this.getContacts = function() {
           return $http.get('ContactList.json')
            .success(function (data) {
                return data;
            })
            .error(function(err) {
              console.log('Fail to get contacts.');
            })

        }

}])

.service('ContactService', function($http) {
  this.DBContacts = function() {
    return $http.post('/DBContacts').success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.getContacts = function() {
    return this.DBContacts().then(function(data) {
      console.log('DONNEES RECUP => ' + data.data.articles);
      var lesdata = data.data.articles;
      return lesdata;
    })
  };
  this.DBParties = function() {
    return $http.post('/DBParties').success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.getParties = function() {
    return this.DBParties().then(function(data) {
      console.log('DONNEES RECUP => ' + data.data.articles);
      var lesdata = data.data.articles;
      return lesdata;
    })
  };
  this.addPartie = function(myData) {
    console.log(myData);
    return $http.post('/addPartie', myData).success(function(data, status, headers, config) {
      console.log(data);
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  }
  this.editContact = function(mydata) {
    return $http.post('/editcontact', mydata).success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.suprContact = function(mydata) {
    return $http.post('/testsupr', mydata).success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.Rejoindreroom = function(mydata) {
    console.log(mydata)
    return $http.post('/Rejoindreroom/'+mydata.corps+'', mydata).success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.RejoindrePartie = function(mydata) {
    console.log(mydata)
    return $http.post('/partie/' + mydata + '', mydata).success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });
  };
  this.lancerPartie = function(room) {
    return $http.get('/partie/'+room+'').success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log('Error !');
    });

};
});




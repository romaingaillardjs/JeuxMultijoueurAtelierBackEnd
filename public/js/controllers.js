angular.module('myApp.controllers',[])
.controller('navCtrl', function($scope) {
  $scope.nav = {
    navItems: ['home', 'Liste des joueurs', 'Creer une partie', 'Rejoindre une partie'],
    selectedIndex: 0,
    navClick: function($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})
.controller('homeCtrl', function($scope, $rootScope, ContactService) {
  ContactService.getContacts().then(function(data) {
    $scope.contacts = angular.fromJson(data);
    console.log($scope.contacts);
  })
})
.controller('listedesjoueursCtrl', function($scope, $rootScope, ContactService) {
  ContactService.getContacts().then(function(data) {
    $scope.Joueurs = angular.fromJson(data);
    $scope.info = function(arg) {
      console.log(arg)
      var index = arg;
      $scope.currentContact = $scope.Joueurs[index].corps;
      console.log($scope.Joueurs[index].corps.id);
      var ContactToRemove = $scope.Joueurs[index].corps.id;
    }
  })
})
.controller('RejoindreunepartieCtrl', function($scope, $location, $rootScope, ContactService, $routeParams) {
  ContactService.getParties().then(function(data) {
    $scope.Parties = angular.fromJson(data);
    $scope.rejoindre = function(arg) {
      console.log(arg)
        //var room = {
             //"corps":""
        //};
        //room.corps = arg;
        //ContactService.Rejoindreroom(room)
        ContactService.lancerPartie(arg)
    }
    $scope.infoPartie = function(arg) {
      console.log(arg)
      var index = arg;
      $scope.currentContact = $scope.Parties[index].corps;
      console.log($scope.Parties[index].corps.id);
    }
  })
})
.controller('jeuxCtrl', function($scope, $rootScope, ContactService) {
  $scope.template = [{
    url: 'public/views/partials/contact_info.html'
  }]
})
.controller('joueurInfoCtrl', function($scope, $rootScope, ContactService) {
  $scope.template = [{
    url: 'public/views/partials/contact_info.html'
  }]
})
.controller('contactInfoCtrl', function($scope, $rootScope, $location, $routeParams, ContactService) {
  var index = $routeParams.contact_index;
  $scope.editcontact = function() {
    $location.path('/edit/' + index + '');
  }
  $scope.setmeeting = function() {
    $location.path('/setMeeting/' + index + '');
  }
  $scope.currentContact = $scope.Joueurs[index].corps;
  console.log($scope.Joueurs[index].corps.id);
  var ContactToRemove = $scope.Joueurs[index].corps.id;
  $scope.removeContact = function(item) {
    ContactService.suprContact({
      supr: ContactToRemove
    }).then(function(data) {
      console.log('DONNEES RECUP => ' + data.data.articles);
      $scope.listeDeMessages = data.data.articles;
      $scope.contacts.splice(index, 1);
    })
    $rootScope.removed = 'Contact successfully removed.';
    $location.path('/home');
  }
})
.controller('CreerpartieCtrl', function($scope, $routeParams, $rootScope, $location, ContactService) {
  $scope.path = $location.path();
  $scope.listeDeMessages = [];
  $scope.addcontact = function(item) {
    var contact = {
      "corps": ""
    };
    contact.corps = $scope.currentContact;
    if (!$scope.currentContact == '') {
      if (!$scope.contacts) {
        contact.corps.id = 0;
      } else {
        contact.corps.id = $scope.contacts.length;
      }
    }
    contact.corps.name = $scope.currentContact.name;
    contact.corps.room = $scope.currentContact.name;
    if ($scope.currentContact.name) {
      ContactService.addPartie(contact).then(function(data) {
        console.log('DONNEES RECUP => ' + data.data.articles);
        $scope.listeDeMessages = data.data.articles;
      }, function() {
        console.log('error');
      });
    } else {
      alert('veuillez saisir nom de la partie')
    }
    $rootScope.removed = 'Contact successfully added.';
    $location.path('/Rejoindre une partie');
  }
})
.controller('editContactCtrl', function($scope, $routeParams, $rootScope, $location, ContactService) {
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index].corps;
  console.log($scope.contacts[index].corps.id)
  $scope.editcontact = function(item) {
    var contact = {
      "corps": ""
    };
    contact.corps = item;
    contact.corps.id = $scope.contacts[index].corps.id;
    ContactService.editContact(contact);
    var mergedObject = angular.extend($scope.contacts[index], $scope.currentContact);
    $scope.contacts[index] = mergedObject;
    $rootScope.removed = 'Contact successfully edited.';
    $location.path('/home');
  }
})






var myApp = angular.module('contactListApp', [
  'ngRoute', 
  'ngMessages', 
  'ui.bootstrap',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
  ])

.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'public/views/partials/home.html',
    controller: 'homeCtrl'
  }).when('/Liste des joueurs', {
    templateUrl: 'public/views/partials/Listedesjoueurs.html',
    controller: 'listedesjoueursCtrl'
  }).when('/Creer une partie', {
    templateUrl: 'public/views/partials/Creerunepartie.html',
    controller: 'CreerpartieCtrl'
  }).when('/Rejoindre une partie', {
    templateUrl: 'public/views/partials/Rejoindreunepartie.html',
    controller: 'RejoindreunepartieCtrl'
  }).when('/parie/test', {
     templateUrl: 'public/app/jeuxmilti.io.html',
    controller: 'jeuxCtrl'
  }).otherwise({
    redirectTo: '/home'
  });
})


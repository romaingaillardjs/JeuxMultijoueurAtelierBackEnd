
/* Directives */

angular.module('myApp.directives',[])

.directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })

.directive('contact', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'public/views/partials/contact.html'
  };
})

.directive('parties', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'public/views/partials/parties.html'
  };
});

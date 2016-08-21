
myApp.factory('dataFactory', function($http) {
  /** https://docs.angularjs.org/guide/providers **/
  var urlBase = '/api/v1/products';
  var _prodFactory = {};

  _prodFactory.getProducts = function() {
    return $http.get(urlBase);
  }; 

  return _prodFactory;
});


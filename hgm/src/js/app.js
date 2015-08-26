var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'src/templates/index.html'})
		.otherwise({redirectTo: '/'});
});

app.controller('ContentController', ['$scope', function($scope) {
}]);
app.controller('NavbarController', ['$scope', function($scope) {
}]);
app.controller('FooterController', ['$scope', function($scope) {
}]);
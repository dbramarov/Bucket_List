var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
		})
		.when('/main/:id', {
			templateUrl: 'partials/main.html',
		})
	    .when("/users/:id", {
	        templateUrl:"partials/users.html"
	    })		
		.otherwise({
			redirectTo: '/'
		})	
});
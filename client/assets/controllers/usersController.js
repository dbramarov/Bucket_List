app.controller('usersController', ['$scope','mainFactory','$routeParams','$location', '$cookies', function($scope, mainFactory, $routeParams , $location, $cookies) {
  $scope.messages = [];

  $scope.user = $cookies.get("user_name");

 //  	if(!$scope.user_name){
	// 	$location.url('/')
	// }

	var usersMain = function(){
		mainFactory.userInfo($routeParams.id, function(data){
            $scope.user_done = data.user_done;
            $scope.taged_done = data.taged_done;
            $scope.user_pend = data.user_pend;
            $scope.taged_pend = data.taged_pend;
            $scope.user = data.user;			
		});
			$scope.user_id = $cookies.get("user_id");
	}
	usersMain();

	$scope.login = function(){
		mainFactory.login($scope.person, function(data){
			console.log(data);
            if(data.errors){
	            if(typeof(data.errors) == "object"){
	               	angular.forEach(data.errors, function(v, k){
	                $scope.messages.push(data.errors[k].message);
	                })
	            }
	            else{
	                $scope.messages.push(data.errors);
	                $location.url("/");
	            }
            }
            else{
                $cookies.put("user_name", data.name);
                $cookies.put("user_id", data._id);
                $location.url("/main/"+data._id);
            }			
		})
	}

	$scope.logout = function(){
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function(v, k){
            $cookies.remove(k);
        })
        $location.url("/");
    }
}]);
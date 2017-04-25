app.controller('mainController', ['$scope','mainFactory','$location', '$cookies', function($scope, mainFactory, $location, $cookies) {
  $scope.messages = [];

  $scope.user_name = $cookies.get("user_name");
  $scope.user_id = $cookies.get('user_id');
  console.log($scope.user_id)
  $scope.newList = {};

	if(!$scope.user_name){
		$location.url('/')
	}

	var main = function(){
		mainFactory.getUser($scope.user_id, function(data){
			$scope.users = data.users;
            $scope.current_user = data.current_user;
		})
	}
	main();

	$scope.create = function(){
		$scope.newList.user = $scope.user_id
		mainFactory.create($scope.newList, function(data){
            if(data.errors){
                console.log(data.errors);
                $scope.errors = data.errors;
            }
            else{
                $scope.errors = [];
            }
            main();
            $scope.newList = {};			
		})
	}

	$scope.logout = function(){
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function(v, k){
            $cookies.remove(k);
        })
        $location.url("/");
    }

    $scope.check = function(id){
    	mainFactory.update(id, function(data){
            if(data.errors){
                console.log(data.errors);
                $scope.errors = data.errors;
            }
            else{
                $scope.errors = [];
            }
            main();
            $scope.newList = {};	
    	})
    }

}]);
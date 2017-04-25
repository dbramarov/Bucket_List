app.factory('mainFactory', ['$http', function($http) {
  var factory = {};

  factory.login = function(newUser, callback){

  	$http.post('/login', newUser).then(function(returned_data){
  		if(typeof(callback) == "function"){
        	callback(returned_data.data);
        }
  	})
  	.catch(function(err){
   	console.log(err);
    });
  }

  factory.getUser = function(id, callback){

    console.log(id);
    $http.get('/main/'+ id).then(function(returned_data){
      if(typeof(callback) == "function"){
          callback(returned_data.data);
        }           
    })
    .catch(function(err){
    console.log(err);
    });    
  }

  factory.userInfo = function(id, callback){

    $http.get('/users/'+ id).then(function(returned_data){
      if(typeof(callback) == "function"){
        console.log(returned_data.data);
          callback(returned_data.data);
        }           
    })
    .catch(function(err){
    console.log(err);
    }); 
  }

  factory.create = function(list, callback){

    console.log(list)
    $http.post('/list', list).then(function(returned_data){
      if(typeof(callback) == "function"){
          callback(returned_data.data);
        }      
    })
    .catch(function(err){
    console.log(err);
    });
  }

  factory.update = function(id, callback){

    $http.post('/list/'+id).then(function(returned_data){
      if(typeof(callback) == "function"){
          callback(returned_data.data);
        }        
    })
    .catch(function(err){
    console.log(err);
    });    
  }

  return factory;
}]);
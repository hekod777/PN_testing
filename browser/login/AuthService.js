debateApp.factory('AuthService', function($http){
	var AuthService = {};
	var user = {};

	AuthService.login = function(credentials){
		return $http.post('/api/sessions', credentials)
			.then (function(result){
				angular.copy(result, user);
				return user;
			});
	};

	AuthService.logout = function(){
		return $http.delete('/api/sessions')
			.then(function(result){
				angular.copy({},user);
				return user;
			});
	};

	AuthService.me = function(){
		return $http.get('/api/sessions')
			.then(function(result){
				angular.copy(result.data, user);
				return user;
			})
	}

	return AuthService;
})
.run(function(AuthService){
	AuthService.me();
});

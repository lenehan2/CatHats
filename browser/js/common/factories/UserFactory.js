app.factory('UserFactory', function($http, AuthService){
	
	return {

		fetchAll: function(){
			return $http.get('/api/users')
			.then(res => res.data);
		},

		fetchOne: function(){
			return $http.get('/api/users/')
		},

		signup: function(user){
			return $http.post('/api/users/', user)
			.then(AuthService.getLoggedInUser.bind(AuthService));
		}

	}

})
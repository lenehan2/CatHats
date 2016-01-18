app.factory('UserFactory', function($http, AuthService){
	
	return {

		fetchAll: function(){
			return $http({
				method: 'GET',
				url: '/api/admin/users/',
			}).then(response => response.data);
		},

		fetchOne: function(userId){
			return $http({
				method: 'GET',
				url: '/api/admin/users/' + userId,
			}).then(response => response.data);
		},

		signup: function(user){
			return $http.post('/api/users/', user)
			.then(AuthService.getLoggedInUser.bind(AuthService));
		},

		update: function(userId, newUserData){
			return $http({
				method: 'PUT',
				//this will need to be modified to accept requests from users that are editing their own profile
				url: 'admin/users/' + userId,
				data: newUserData
			})
			.then(response => response.data)
			.then(null, console.error.bind(console));
		}

	}

})
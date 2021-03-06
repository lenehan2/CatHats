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
			return $http.post('/api/user/', user)
			.then(AuthService.getLoggedInUser.bind(AuthService));
		},

		makeAdmin: function(userId){
			return $http({
				method: 'PUT',
				//this will need to be modified to accept requests from users that are editing their own profile
				url: '/api/admin/users/' + userId,
				data: { isAdmin: true }
			})
			.then(response => response.data)
			.then(null, console.error.bind(console));
		},
		newPassword: function(userId){
			return $http({
				method: 'PUT',
				url: '/api/admin/users/' + userId,
				data: { requireNewPasswordOnLogin: true }
			})
			.then(res => res.data)
			.then(null,console.error.bind(console))
		},
		updatePassword: function(newPass){
			return $http({
				method: 'PUT',
				url: 'api/user/',
				data: { password: newPass, requireNewPasswordOnLogin: false },
			}).then(res => res.data)
			.then(null, console.error.bind(console))
		},

		deleteUser: function (userId) {
			return $http({
				method: 'DELETE',
				url: '/api/admin/users/' + userId
			});
		}

	}

})

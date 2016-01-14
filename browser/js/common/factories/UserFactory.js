app.factory('UserFactory', function($http){
	
	return {

		fetchAll: function(){
			return $http.get('/api/users')
			.then(res => res.data);
		},

		fetchOne: function(){
			return $http.get('/api/users/' )
		}

	}

})
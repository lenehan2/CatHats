app.factory('CategoryFactory', function($http){

	return {

		addCategory: function(categoryName){
			return $http({
				method: 'POST',
				url: '/api/admin/categories',
				data: {
					name: categoryName
				}
			});
		},

		fetchAll: function(categoryName){
			return $http({
				method: 'GET',
				url: '/api/categories'
			})
            .then(res => res.data);
		}

	};

})

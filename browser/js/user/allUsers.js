app.config(function($stateProvider){
	$stateProvider.state('allUsers', {
		url: '/allUsers',
		templateUrl: 'js/user/allUsers.html',
		controller: 'allUsersCtrl',
		resolve: {
			users: function(UserFactory){
				return UserFactory.fetchAll();
			}
		}
	})
})

app.controller('allUsersCtrl', function($scope, users){
	$scope.users = users;
})
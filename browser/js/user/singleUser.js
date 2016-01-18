app.config(function($stateProvider){
	$stateProvider.state('singleUser', {
		url: '/users/:userId',
		templateUrl: '/js/user/singleUser.html',
		controller: 'singleUserCtrl',
		resolve: {
			user: function(UserFactory, $stateParams){
				return UserFactory.fetchOne($stateParams.userId);
			}
		}
	});
});

app.controller('singleUserCtrl', function($scope, user){
	$scope.user = user;
})
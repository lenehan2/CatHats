app.directive('userItem', function(UserFactory, $state) {
	return {
		restrict: 'E',
		scope: {
			user: '=',
			canEdit: '='
		},
		templateUrl: 'js/user/user-item.html',
		link: function (scope) {

			scope.makeAdmin = function () {
				UserFactory.makeAdmin(scope.user._id)
					.then(function () {
						$state.reload();
					});
			};

            scope.newPassword = function () {
				UserFactory.newPassword(scope.user._id)
				.then(function (){
					$state.reload();
				})
			};

            scope.deleteUser = function (userId) {
                UserFactory.deleteUser(userId)
                    .then(() => $state.reload())
                    .then(null, err => $scope.error = err);
            };


		}
	}
})

app.directive('userItem', function(UserFactory, $state) {
	return {
		restrict: 'E',
		scope: {
			user: '=',
			canEdit: '='
		},
		templateUrl: 'js/user/user-item.html',
		link: function (scope) {
			scope.editMode = false;
			
			scope.toggleEditMode = function () {
				if (!scope.editMode) scope.editMode = true;
				// by reloading, you're setting the editMode back to false
				else $state.reload();
			}

			scope.save = function (newUserData) {
				UserFactory.update(scope.product._id, newUserData)
					.then(function () {
						scope.toggleEditMode();
						$state.reload();
					});
			}
		}
	}
})
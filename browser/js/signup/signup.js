app.config(function($stateProvider){
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'signupCtrl'
	});

});


app.controller('signupCtrl', function($scope, UserFactory, $state){
	$scope.signup = {};
    $scope.error = null;

    $scope.sendsignup = function (signupInfo) {

        $scope.error = null;

        UserFactory.signup(signupInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });

    };

});
app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state,$rootScope, UserFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(() => AuthService.getLoggedInUser())
        .then(user => {
            if(user.requireNewPasswordOnLogin){
                $state.go('updatePassword')
            }else{
                $state.go('home')
            }
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.updatePassword = function (password1,password2){
        if(password2 !== password1){
            $scope.error = 'Passwords do not match'
        }else{
            UserFactory.updatePassword(password1)
            .then(user => {
                $state.go('home')
            })
        }
    }

    $rootScope.$on('require-new-password',function(data){
        console.log("NEW PASS NEEDED")
    })

});
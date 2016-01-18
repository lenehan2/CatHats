app.config(function ($stateProvider) {

    $stateProvider.state('updatePassword', {
        url: '/login/update',
        templateUrl: 'js/newPass/newPass.html',
        controller: 'LoginCtrl'
    });

});

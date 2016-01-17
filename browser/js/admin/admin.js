app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        template: '<div><h3>Test</h3></div>',
        controller: function ($scope, SecretStash) {
            SecretStash.getStash().then(function (stash) {
                $scope.stash = stash;
            });
        },
        // The following data.AdminAuthenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            adminAuthenticate: true
        }
    });

});

app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            //for My Profile dropdown menu
            scope.isCollapsed = true;

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Browse', state: 'products({ categories: null, title: null })'},
                { label: 'Cart', state: 'cart' },
                { label: 'Admin', state: 'admin', admin: true}

            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function(){
                return AuthService.isAdmin();
            }

            scope.regexName = function(email){
                if(!email){
                    return;
                }
                var emailString = email;
                return emailString.replace(/@.*/g, "");
            }

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('landingPage');
                });
            };

            scope.isState = function(){
                return $state.is("home")
            }

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };



            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

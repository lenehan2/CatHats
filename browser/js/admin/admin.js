app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        // controller: 'AdminCtrl',
        // resolve: {
        //     user: function (AuthService) {
        //         return AuthService.getLoggedInUser();
        //     }
        // },
        data: {
            adminAuthenticate: true
        }
    });

    $stateProvider.state('admin.products', {
        url: '/products',
        templateUrl: 'js/admin/admin-products.html',
        resolve: {
            products: function (ProductFactory) {
                return ProductFactory.getProducts();
            }
        },
        controller: function ($scope, products) {
            $scope.products = products;
        }
    });

});
//
// app.controller('AdminCtrl', function ($scope) {
//     $scope.user = user;
// })

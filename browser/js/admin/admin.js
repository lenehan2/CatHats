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
            },
            categories: function (CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
        },
        controller: function ($scope, products, categories) {
            $scope.products = products;
            $scope.categories = categories;
        }
    });

    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl: 'js/admin/admin-users.html',
        resolve: {
            users: function (UserFactory) {
                return UserFactory.fetchAll();
            }
        },
        controller: function ($scope, $state, users, UserFactory) {
            $scope.users = users;
        }
    });

    $stateProvider.state('admin.singleUser', {
        url: '/users/:id',
        templateUrl: '/js/admin/edit-user.html',
        resolve: {
            user: function (UserFactory, $stateParams) {
                return UserFactory.fetchOne($stateParams.id);
            }
        },
        controller: function ($scope, user) {
            $scope.user = user;
        }
    });

});
//
// app.controller('AdminCtrl', function ($scope) {
//     $scope.user = user;
// })

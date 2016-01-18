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

    $stateProvider.state('admin.newProduct', {
        url: '/new-product',
        templateUrl: 'js/admin/new-product.html',
        controller: function ($scope, $state, ProductFactory) {
            $scope.newProduct = {};
            $scope.save = function (newProduct) {
                ProductFactory.addProduct(newProduct)
                    .then(addedProduct => $state.go('admin.singleProduct', { id: addedProduct._id }));
            }
        }
    })

    $stateProvider.state('admin.singleProduct', {
        url: '/products/:id',
        templateUrl: 'js/admin/edit-product.html',
        resolve: {
            product: function (ProductFactory, $stateParams) {
                return ProductFactory.getSingleProduct($stateParams.id);
            }
        },
        controller: function ($scope, product) {
            $scope.product = product;
        }
    })
});
//
// app.controller('AdminCtrl', function ($scope) {
//     $scope.user = user;
// })

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {
            cart: function(CartFactory) {
                return CartFactory.getCart();
            }
        }
    })
})

app.controller('cartCtrl', function($scope, cart, CartFactory) {
    $scope.cart = cart;

    $scope.updateCart = CartFactory.updateCart;

})

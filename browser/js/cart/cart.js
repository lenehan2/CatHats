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
    $scope.order = {test: 'test'}
    $scope.order.cart = cart;
    $scope.updateCart = CartFactory.updateCart;
    $scope.removeItem = function(productId,cartObj){

    	CartFactory.removeItem(productId,cartObj)
    	.then(updatedCart => $scope.cart=updatedCart)

    }
    $scope.placeOrder = function (order){
        console.log("order")
    }

})

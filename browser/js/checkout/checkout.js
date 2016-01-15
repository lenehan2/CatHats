app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        resolve: {
            cart: function(CartFactory) {
                return CartFactory.getCart();
            }
        },
        controller: 'cartCtrl'
    })
})
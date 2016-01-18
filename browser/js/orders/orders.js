app.config(function ($stateProvider) {
    $stateProvider.state('userOrders', {
        url: '/users/:id/orders',
        templateUrl: 'js/orders/all-orders.html',
        controller: 'OrdersCtrl',
        resolve: {
            orders: function (OrderFactory, $stateParams) {
                console.log($stateParams.id)
                return OrderFactory.getCurrentUsersOrders();
            }
        }
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/orders/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function (OrderFactory, $stateParams) {
                return OrderFactory.getOrderById($stateParams.id);
            }
        }
    })
})

app.controller('OrdersCtrl', function ($scope, orders) {
    $scope.orders = orders;
});

app.controller('OrderCtrl', function ($scope, order) {
    $scope.order = order;
});

app.directive('orderItem', function () {
    return {
        restrict: 'E',
        scope: {
            order: '=',
            full: '=',
            cancel: '='
        },
        templateUrl: 'js/orders/order-item.html',
        link: function (scope) {
            scope.totalPrice = scope.order.products.reduce(function (acc, curr) {
                return acc + (curr.price * curr.quantity);
            }, 0);
        }
    }
});

app.directive('orderProduct', function () {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        templateUrl: 'js/orders/order-product.html'
    }
});

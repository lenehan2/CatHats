app.config(function($stateProvider) {
    $stateProvider.state('adminAllOrders', {
        url: '/admin/orders?_id?name',
        templateUrl: '/js/admin.orders/orders.html',
        resolve: {
            orders: function(OrderFactory, $stateParams) {
            	console.log('Params: from orders.js ', $stateParams)
                return OrderFactory.adminGetAllOrders($stateParams)
            }
        },
        controller: function($scope, orders) {
            $scope.orders = orders;
            $scope.items = [{
                id: 1,
                label: 'ID',
                value: '_id'
            }, {
                id: 2,
                label: 'User name',
                value: 'name'
            }];
            
        }
    })
})

app.config(function($stateProvider) {
    $stateProvider.state('adminOrder', {
        url: '/admin/orders/:id',
        templateUrl: '/js/admin.orders/order.html',
        resolve: {
            order: function(OrderFactory, $stateParams) {
                return OrderFactory.adminGetOrderById($stateParams.id)
            }
        },
        controller: function($scope, order, OrderFactory,$state) {
            $scope.order = order;
            $scope.cancel = function(id){
                OrderFactory.adminDeleteOrder(id)
                .then(function(){
                    $state.reload()
                })
            }
                
            $scope.test = "TEST"
        }
    })
})

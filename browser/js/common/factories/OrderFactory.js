app.factory('OrderFactory', function ($http) {
    return {
        //This should probable be '/api/user/orders'
        //Seperate routes for getting users cart vs admin abilities
        getOrdersByUser: function (userId) {
            return $http.get('/api/admin/users/' + userId + '/orders')
                .then(res => res.data)
                .then(null, err => console.error(err));
        },

        adminGetOrderById: function (orderId) {
            return $http.get('/api/admin/orders/' + orderId)
                .then(res => res.data)
                .then(null, err => console.error(err));
        },
        getCurrentUsersOrders: function(){
            return $http.get('/api/user/orders')
                .then(res => res.data)
                .then(null, err => console.error(err))
        },
        getOrderById: function(orderId){
            return $http.get('/api/user/orders/' + orderId)
                .then(res => res.data)
                .then(null, err => console.error(err));
        }
    }
})

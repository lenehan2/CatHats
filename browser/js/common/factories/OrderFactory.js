app.factory('OrderFactory', function ($http) {
    return {
        getOrdersByUser: function (userId) {
            return $http.get('/api/users/' + userId + '/orders')
                .then(res => res.data)
                .then(null, err => console.error(err));
        },

        getOrderById: function (orderId) {
            return $http.get('/api/orders/' + orderId)
                .then(res => res.data)
                .then(null, err => console.error(err));
        }
    }
})
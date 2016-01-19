app.factory('ReviewFactory', function($http) {

    return {
      submitReview: function(review, productId){
        review.product = productId;

        return $http.post('/api/products/' + review.product + '/reviews', review)
        .then(res => res.data)
      },

      getReviewsByProduct: function (productId) {
        return $http.get('/api/products/' + productId + '/reviews')
        .then(res => res.data)
        .then(null, err => console.error(err));
      }

    }
});
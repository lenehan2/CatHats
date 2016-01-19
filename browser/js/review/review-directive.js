app.directive('addReview', function (ReviewFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/review/addReview.html',
        link: function(scope){
        	scope.submitReview = function(review, productId){
        		scope.error = "";
        		return ReviewFactory.submitReview(review, productId)
        		.then(data => data)
        		.then(function(){
        			$state.reload('singleProduct');
        		})
        		.catch(function(){
        			scope.error = "You already submitted a review for this product, ya dingus!";
        		})

        	}

        }

    }
})


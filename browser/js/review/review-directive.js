app.directive('addReview', function (ReviewFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/review/addReview.html',
        link: function(scope){
        	scope.submitReview = function(review, productId){
        		scope.error = "";
                if(review.description.length < 50){
                    scope.error = "Come on, Shakespeare! You've got more to say than that. Your description needs to be at least 50 characters."
                    return;
                }
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


app.directive('productItem', function (CartFactory, ProductFactory, AuthService, $state) {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            full: '=',
            canEdit: '='
        },
        templateUrl: 'js/product/product-item.html',
        link: function (scope, element) {
            scope.addToCart = CartFactory.addProduct;
            scope.editMode = false;

            scope.toggleEditMode = function () {
                if (!scope.editMode) scope.editMode = true;
                else $state.reload()
            }

            scope.save = function (newData) {
                //
                // //grab new categories from the checkbox inputs
                // const checkboxes = [].slice.call(element.find('input'));
                //
                // newData.categories = checkboxes.reduce(function (acc, curr) {
                //     if (curr.checked) acc.push(curr.value);
                //     return acc;
                // }, [])
                console.log(newData);
                ProductFactory.updateProduct(scope.product._id, newData)
                    .then(function () {
                        scope.toggleEditMode();
                        $state.reload();
                    });

            }
        }
    }
});

app.directive('editProductCategories', function () {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            categories: '='
        },
        templateUrl: 'js/admin/edit-product-categories/edit-product-categories.html',
        link: function (scope, element) {

            // TODO figure out how to do this only when the boxes are clicked
            element.on('click', function () {
                scope.product.categories = updateCategories();
                console.log('product: ', scope.product);
            });

            function updateCategories() {
                const checkboxes = [].slice.call(element.find('input'));

                return checkboxes.reduce(function (acc, curr) {
                    if (curr.checked) acc.push(curr.value);
                    return acc;
                }, []);
            }
        }
    }
})

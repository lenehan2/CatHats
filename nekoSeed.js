var nekoSeedProducts = function() {
    var products = [{
        title: 'Frisky Bitz',
        price: '30',
        description: "Made from nutritious and delicious farm-to-bowl ingredients, Frisky Bitz might boost your powers of cat attraction."
        inventory: 20,
        imageUrl: 'https://www.texashumaneheroes.org/wp-content/uploads/Halloween-cat-batman.jpg'
    }]

    return Product.createAsync(products);
}
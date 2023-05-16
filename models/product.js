const getProductsByCategoryId = db => async( id ) => {
    const products = await db( 'products' )
                            .select( '*' )
                            .where( 'id', function() {
                                this.select( 'categories_has_products.product_id' )
                                .from( 'categories_has_products' )
                                .whereRaw( 'categories_has_products.product_id = products.id' )
                                .where( 'category_id', id )
                            } );

    return products;

};

module.exports = {
    getProductsByCategoryId
}
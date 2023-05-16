const express = require( 'express' );
const app = express();
const path = require( 'path' );
const category = require( './models/category' );
const product = require( './models/product' );
const db = require( 'knex')( {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: '3309',
        user: 'root',
        password: '',
        database: 'devshop'
    }
} );

db.on( 'query', ( data ) => {
    console.log( data.sql );
} );

const port = process.env.PORT || 3000;

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'views' ) );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/', async( req, res ) => {
    const categories = await category.getCategories(db)();

    res.render( 'home', { categories } );
} );

app.get( '/categories/:id/:slug', async( req, res ) => {
    const categories = await category.getCategories(db)();

    const products = await product.getProductsByCategoryId(db)( req.params.id );
    const cat = await category.getCategory(db)( req.params.id );
;
    res.render( 'category', {
        categories,
        products,
        category: cat
    } );
} );

app.listen( port, err => {
    if ( err ) {
        console.log( err );
    }
    else {
        console.log( 'Devshop server rodando...' );
    }
} );
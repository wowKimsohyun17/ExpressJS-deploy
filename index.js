require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var userRouter = require('./routes/user.route');
var bookRouter = require('./routes/book.route');
var transRouter = require('./routes/transaction.route');
var authRouter = require('./routes/auth.route');
var productsRouter = require('./routes/products.route');
var cartRouter = require('./routes/cart.route');

var apiLoginRouter = require('./api/route/login.route');
var apiBookRouter = require('./api/route/book.route');
var apiTransactionRouter = require('./api/route/transaction.route');
var apiUserRouter = require('./api/route/user.route');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/api/login', apiLoginRouter);
app.use('/api/book', apiBookRouter);
app.use('/api/transaction', apiTransactionRouter);
app.use('/api/user', apiUserRouter);

app.use(express.static('public'));
app.use(sessionMiddleware);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('index', {
        name: 'AAAA'
    });
});

app.get('/error', function(req, res, next){
    try{
        var a;
        a.b();
    } catch (error){
        next(error);
    };
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).render('error.pug', {
        error: err
    });
});

app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/books', bookRouter);
app.use('/transactions', authMiddleware.requireAuth, transRouter);
app.use('/products', authMiddleware.requireAuth, productsRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);

app.listen(port, function(){
    console.log('App listening on port' + port);
});


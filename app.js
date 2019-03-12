const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use((req,res,next) => {
    console.log('One');
    next();
});

app.use((req,res,next) => {
    console.log('Two');
    next();
});

app.use((req,res,next) => {
    console.log('Three');
    next();
});




app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
    res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb?", hint: "Think about it..."});
});

app.get('/hello', (req, res) => {
    res.render('hello');
})

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
})

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
})

app.listen(3000, () => {
    console.log ('The application is running on localhost:3000!')
});
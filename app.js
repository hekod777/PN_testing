const express = require('express');
const app = express();
const swig = require('swig');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const models = require('./db');
const Question = models.models.Question;
const Answer = models.models.Answer;
const User = models.models.User;

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'browser')));

app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(session({
	secret: process.env.SECRET,
	resave:false,
	saveUninitialized: true,
	cookie:{secure:true},
}));

app.use(function(req, res, next){
	console.log (req.session.userId);
	if(!req.session.userId)
		return next();
	User.findById(req.session.userId)
		.then(function(user){
			if(user){
				req.user = user;
				next();
			}
		})
		.catch(next);
})


swig.setDefaults({cache: false});

app.use(bodyParser.json());
app.use('/api/questions', require('./routes/question.js'));
app.use('/api/sessions', require('./routes/login.js'));

app.get('/', function(req, res, next){
	res.render('index');
})

module.exports = app;

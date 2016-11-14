const express = require('express');
const router = express.Router();
const models = require('../db');
const Question = models.models.Question;
const Answer = models.models.Answer;
const User = models.models.User;

router.get('/', function(req, res, next){
	if(req.user)
		res.send(req.user);
	res.sendStatus(401);
});

router.post('/', function(req, res, next){
	User.findOne({
		where:{
			username: req.body.username,
			password: req.body.password,
		}
	})
		.then (function(result){
			if (result){
				req.session.userId = result.id;
				return res.send(result);
			}

			res.sendStatus(401);
		})
		.catch(next);
});

router.delete('/', function(req, res, next){
	req.session.destroy();
	res.sendStatus(200);
})


module.exports = router;


const express = require('express');
const router = new express.Router();
const models = require('../db');
const Question = models.models.Question;
const Answer = models.models.Answer;
const User = models.models.User;

router.get('/', function(req, res, next){
	Question.findAll()
		.then(function(results){
			res.send(results);
		})
		.catch(next);
});

router.post('/:content/:respondent', function(req, res, next){
	Question.create({
		content: req.params.content,
		respondent: req.params.respondent,
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})

router.get('/:respondent', function(req, res, next){
	console.log (req.params.respondent);
	Question.findAll({
		where:{
			respondent: req.params.respondent,
		}
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
})



module.exports = router;


debateApp.factory('QuestionFactory',function($http, $state){
	var questions = [];
	var QuestionFactory = {};
	var testQuestions = [];

	QuestionFactory.getAll = function(){
		return $http.get('/api/questions')
			.then(function(results){
				angular.copy(results.data, questions);
				return questions;
			})
	}

	QuestionFactory.save = function(newQuestion){
		return $http.post('/api/questions/' + newQuestion.content + '/' + newQuestion.respondent, newQuestion)
			.then(function(result){
				questions.push(result.data);
				return questions;
			})

	}

	QuestionFactory.findAllFrom = function(someone){
		console.log ('someone is ' + someone);
		return $http.get('/api/questions/'+ someone)
			.then(function(results){
				angular.copy(results.data, testQuestions);
				console.log('testquestion is ' + testQuestions);
				console.log (testQuestions);
				return testQuestions;
			})
	}

	return QuestionFactory;

})
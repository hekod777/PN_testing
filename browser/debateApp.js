var debateApp = angular.module('debateApp', ['ui.router']);

debateApp
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'/home.html',
				controller: function($scope, $state){

					$scope.disableButton = false;

					var connection = new RTCMultiConnection();
					console.log(connection);
					console.log(typeof(connection));

					connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

					connection.session = {
						audio:true,
						video:true,
						ssl: false
					}

					connection.sdpConstraints.mandatory = {
						OfferToReceiveAudio : true,
						OfferToReceiveVideo : true,
					}

					$scope.ojroom = function(){
						console.log("aaa");
						$scope.disableButton = true;
						connection.openOrJoin('doo');
					}




				},
			})
			.state('questions',{
				resolve:{
					questions:function(QuestionFactory){
						return QuestionFactory.getAll();
					}
				},
				url:'/questions',
				templateUrl:'/question/question.html',
				controller: function(questions, QuestionFactory, $scope, $state){
					console.log (questions);
					$scope.questions = questions;
					var video_out = document.getElementById("vid-box");
					console.log(window.CONTROLLER);
					



					$scope.login = function() {
						var phone = window.phone = PHONE({
						    number        : $scope.loginname || "Anonymous", // listen on username line else Anonymous
						    publish_key   : 'pub-c-3dafe74d-5940-47bb-8ea0-c6f0cab89732',
						    subscribe_key : 'sub-c-c82b4f8e-a9f1-11e6-a114-0619f8945a4f',
						});

						console.log($scope.loginname);
						phone.ready(function(){});
						phone.receive(function(session){
							console.log(session);
						    session.connected(function(session) { video_out.appendChild(session.video); });
						    session.ended(function(session) { video_out.innerHTML=''; });
						});
						return false; 	// So the form does not submit.
					}

					$scope.makeCall = function(){
						if (!window.phone) alert("Login First!");
						else {
							phone.dial($scope.callname);
							console.log("watching" + $scope.callname);
						}
						return false;
					}

					console.log($scope.login);

					$scope.save = function(){
						QuestionFactory.save($scope.newquestion)
							.then(function(){
								$scope.newquestion.content = '';
								$scope.newquestion.respondent = '';
							})
					}
				},
			})
			.state('respondent', {
				url: '/respondent/:respondent',
				templateUrl:'/question/respondent.html',
				resolve:{
					testQuestions: function(QuestionFactory, $stateParams){
						console.log ($stateParams.respondent);
						return QuestionFactory.findAllFrom($stateParams.respondent);
					}
				},
				controller: function(testQuestions, $scope){
					console.log (testQuestions);
					$scope.testQuestions = testQuestions;
				}

			})
			.state('login',{
				url:'/login',
				templateUrl:'/login.html',
				controller: function(AuthService, $state, $scope){
					$scope.login = function(){
						AuthService.login($scope.credentials)
							.then(function(){
								$state.go('home');
							})
					}
				}				
			})

	$urlRouterProvider.otherwise('/');
	
	});

// .state('home')
// .state('home.cool')
// <ui-sref='.cool'></ui-sref>
// $state.go('home({me:'aa'})')  in a controller
// 

const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

var Question = db.define('question',{
	content:{
		type: Sequelize.TEXT,
		allowNull: false,
	},
	respondent:{
		type: Sequelize.STRING,
		allowNull: true,
	},
	tags:{
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull:true,
	},
});

var Answer = db.define('answer',{
	content:{
		type: Sequelize.TEXT,
		allowNull: false,
	},
	speakingPerson:{
		type: Sequelize.STRING,
		allowNull: true,
	},
	answerFor:{
		type: Sequelize.INTEGER,
		allowNull: false,
	}
});

var User = db.define('user',{
	username:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	password:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	access:{
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'member',
	},

})

var seed = function(){
	return Promise.all([
		Question.create({
			content:'Whats wrong with your tax! Mr. Trump!',
			respondent:'Trump',
		}),
		Question.create({
			content:'Are you stupid? Mr. Trump!',
			respondent:'Trump',
		}),
		Answer.create({
			content:'This is the great part of our tax code! Help the weaks. Tax the strongs. and grow the economy!',
			answerFor:1,
		}),
		User.create({
			username:'faketrump',
			password:'abc',
		}),
		User.create({
			username:'ronpaul',
			password:'1111',
			access:'admin',
		})
	])
}

var sync = function(){
	return db.sync({force:true});
}

var syncAndSeed = function(){
	return sync()
		.then(seed);
}

module.exports = {

	models:{
		Question: Question,
		Answer: Answer,
		User: User,
	},
	sync: sync,
	seed: seed,
	syncAndSeed: syncAndSeed,

};



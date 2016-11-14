const server = require('http').createServer(require('./app'));
const db = require('./db');

var port = process.env.PORT || 3000;

if (process.env.SYNC){
	console.log ('sync finish');
	db.syncAndSeed()
		.then(function(){

		})
		.catch(function(err){
			console.log.bind(err);
		});
}

server.listen(port,function(){
	console.log('listening to ' + port);
})
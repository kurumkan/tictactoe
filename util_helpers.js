var request = require('request');  

module.exports = {	
	//handle internal errors
	handleError: function(response, error){
		console.log(error.stack);
		response.status(500);
		response.json({error: "error: internal server error"});				
	}
}
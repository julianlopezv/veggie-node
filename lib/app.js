/*
 * Veggie Check!
 * https://github.com/julianlopezv/veggie-node
 *
 * Copyright (c) 2016 Julián Andrés López Valencia
 * Licensed under the MIT license.
 */

var express = require('express');
var app = express();
var cors = require('cors');
var veggie = require('./veggie');

app.set('port', (process.env.PORT || 80));
//app.use(express.static(__dirname + '/public'));

app.use(cors());

app.get('/', function(request, response) {
	response.send("Veggie Check! API, more in <b>https://github.com/julianlopezv/veggie-node<b>");
});

app.get('/auth', function(request, response) {
	var user = request.query.username;
	var password = veggie.makeMd5(request.query.password);
	var connection = veggie.makeConnection();
	if(connection != null){
		connection.connect(function(err){
			if(!err) {
				connection.query("SELECT id, password from usuarios where nombre = '"+user+"' and password = '"+password+"'", 
					function(err, rows) {
		  				response.send(veggie.validateAuth(err, rows, password));
		  			}
		  		);
		  		connection.end();
  			}
		});
	}
});

app.listen(app.get('port'), function() {
  console.log('Veggie Check app is running on port', app.get('port'));
});

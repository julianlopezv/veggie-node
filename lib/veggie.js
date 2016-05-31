/*
 * Veggie Check!
 * https://github.com/julianlopezv/veggie-node
 *
 * Copyright (c) 2016 Julián Andrés López Valencia
 * Licensed under the MIT license.
 */

'use strict';

var mysql = require('mysql');
var connection;
var dbhost = 'app.osincloud.com';
var dbuser = 'veggie';
var dbpassword = 'veggie';
var dbdatabase = 'veggie';

var crypto = require('crypto');

exports.makeConnection = function() {
	connection = mysql.createConnection({
		host     : dbhost,
		user     : dbuser,
		password : dbpassword,
		database : dbdatabase
	});
	return connection;
};

exports.validateAuth = function(err, rows, password){
	if (!err){
		if(rows[0] != null && rows[0].id > 0 && rows[0].password === password){
			return {token:exports.makeMd5(rows[0].id+"")};
		}
		else{
			return 'NO AUTHORIZED';
		}
	}
	else{
		return 'SERVER ERROR CODE 45';
	}
};

exports.makeMd5 = function(str){
	return crypto.createHash('md5').update(str).digest("hex");
};
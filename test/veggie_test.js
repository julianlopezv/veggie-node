/*
 * Veggie Check!
 * https://github.com/julianlopezv/veggie-node
 *
 * Copyright (c) 2016 Julián Andrés López Valencia
 * Licensed under the MIT license.
 */

'use strict';

var veggie = require('../');
var assert = require('should');
var request = require('request');
var expect = require('chai').expect;

describe('veggie', function () {

	it('Verificar que la conexión se construye con los datos suministrados', function () {
		veggie.makeConnection().should.not.equal(null);
	});

	it('Se hay error al validar el usuario debe decir SERVER ERROR CODE 45', function () {
		veggie.validateAuth('[]', '[]', 'test').should.equal("SERVER ERROR CODE 45");
	});

	it('Un usuario con password "test" obtiene el token "c4ca4238a0b923820dcc509a6f75849b"', function () {
		var user = {id:1, password:"098f6bcd4621d373cade4e832627b4f6"};
		veggie.validateAuth(null, [user], '098f6bcd4621d373cade4e832627b4f6').token.should.equal('c4ca4238a0b923820dcc509a6f75849b');
	});

	it('Un usuario no registrado no debe obtener acceso', function () {
		veggie.validateAuth(null, '[]', '').should.equal('NO AUTHORIZED');
	});

	it('El hash MD5 para "test" es "098f6bcd4621d373cade4e832627b4f6"', function () {
		veggie.makeMd5('test').should.equal("098f6bcd4621d373cade4e832627b4f6");
	});


  	it('Service Auth: El usuario "test" con password "test" debe obtener el token "c4ca4238a0b923820dcc509a6f75849b"', function (done) {
  		request.get('http://veggiecheck.herokuapp.com/auth?username=test&password=test', function (err, res, body){
    		expect(res.statusCode).to.equal(200);
    		expect(res.body).to.equal('{"token":"c4ca4238a0b923820dcc509a6f75849b"}');
    		done();
  		});
	});

});

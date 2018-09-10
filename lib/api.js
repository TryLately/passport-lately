'use strict'

var request = require('request');
var queryString = require('query-string');

/**
For local testing construct with config {
	serverURL:'http://localhost:3000'
}
**/

function Api( token, config ) {
	this._token = token
	this._config = config
}

/**
Usage: get(path,[{queryParams}],cb)
**/
Api.prototype.get = function() {

	if ( arguments.length < 2 || arguments.length > 3 ) {
		throw 'usage: get(path,[{params}],cb)';
	}

	var path = arguments[0].startsWith('/')? arguments[0].substring(1) : arguments[0];
	var params = arguments.length == 3? arguments[1] : false;
	var cb = arguments[arguments.length-1];

	// stringify options
	params = params && Object.keys(params).length? '/'+ queryString.stringify(params) : ''

	var baseURL = this._config && this._config.serverURL ? this._config.serverURL : 'https://www.trylately.com'

	var options = {
		method:'GET',
		url:`${baseURL}/v1/apps/${path}${params}`,
		headers: {
			Authorization: `Bearer ${this._token}`
		}
	}

	request(options,function(err,response,body) {
  	if (response && response.statusCode == 200) {
	  	try {
		    cb(false,JSON.parse(body))
		  } catch( err ) {
		  	cb(err)
		  }
	  } else if ( response ) {
	  	cb( {statusCode:response.statusCode, statusMessage:response.statusMessage} )
	  } else cb(err)
	})

}

/**
Usage: post(path,[{values}],cb)
**/
Api.prototype.post = function() {

	if ( arguments.length < 2 || arguments.length > 3 ) {
		throw 'usage: post(path,[{params}],cb)';
	}

	var path = arguments[0].startsWith('/')? arguments[0].substring(1) : arguments[0];
	var params = arguments.length == 3? arguments[1] : false;
	var cb = arguments[arguments.length-1];

	var baseURL = this._config && this._config.serverURL ? this._config.serverURL : 'https://www.trylately.com'

	var options = {
		method:'POST',
		form: params || {},
		url:`${baseURL}/v1/apps/${path}`,
		headers: {
			Authorization: `Bearer ${this._token}`
		}
	}

	request(options,function(err,response,body) {
	  if (response && response.statusCode == 200) {
	  	try {
		    cb(false,JSON.parse(body))
		  } catch( err ) {
		  	cb(err)
		  }
	  } else if ( response ) {
	  	cb( {statusCode:response.statusCode, statusMessage:response.statusMessage} )
	  } else cb(err)

	})

}

module.exports = Api
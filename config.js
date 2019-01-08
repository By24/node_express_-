'use strict';

module.exports = {
	port: 8005,
	url: 'mongodb://localhost:27017/mall',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:  365 * 24 * 60 * 60 * 1000,
		}
	}
}
// mongodb://user:password@sample.com:port/dbname

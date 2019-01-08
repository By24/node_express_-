import express from 'express';
import db from './mongoose/db.js';
import config from './config';
import router from './roters/index';
import history from 'connect-history-api-fallback';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import swig from 'swig';
import chalk from 'chalk';

const app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin );
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With,Token");
	res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.sendStatus(200);
	} else {
	    next();
	}
});

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	  name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
	  url: config.url
	})
}))

app.use(history());
app.use(express.static('./public'));

app.engine("html", swig.renderFile);
app.set("views", "./views");
app.set("view engine", "html")
swig.setDefaults({ cache: false })


router(app);

// catch 404 and forward to error handler
// app.use('*', function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	res.send(err)
// 	// next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});
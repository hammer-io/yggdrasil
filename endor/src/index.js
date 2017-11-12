import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import projects from './routes/projects';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static('doc'));

// API ENDPOINTS //
app.use('/api/v1', [index, projects]);


// END API ENDPOINTS //

// catch 404 and forward to error handler
app.use((err, req, res) => {
  const error = new Error('Not Found');
  error.status = 404;
  res.send(error);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(3000, () => {
  console.log('Yggdrasil has now started on port 3000!')
});

module.exports = app;

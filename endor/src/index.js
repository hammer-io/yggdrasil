import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './routes/index.routes';
import * as projects from './routes/projects.routes';
import * as contributors from './routes/contributors.routes';
import ProjectService from './services/projects.service';
import sequalize from './db/sequelize';
import { getActiveLogger } from './utils/winston';

const app = express();

// middleware //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// dependency injections //
const projectService = new ProjectService(sequalize.User, sequalize.Project, getActiveLogger());
projects.setProjectService(projectService);
contributors.setDependencies(projectService);
// end dependency injections //


// API ENDPOINTS //
app.use('/', express.static('doc'));
app.use('/api', index);
app.use('/api/v1', [projects.router, contributors.router]);
// END API ENDPOINTS //

// default 404 handler
// for url's that don't match a defined pattern
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
    documentation_url: `http://${req.get('host')}`
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
// eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => {
  console.log('Yggdrasil has now started on port 3000!')
});

module.exports = app;

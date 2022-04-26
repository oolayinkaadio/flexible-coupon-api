const express = require('express');
// const logger = require('morgan');

const router = require('./routes/index');
const { errorResponse, statusCodes, successResponse, messages } = require('./utils');

const app = express();

app.use(express.json());

// app.use(logger('dev'));

const port = process.env.PORT || 4200;

app.use('/api/v1/', router);

app.get('/api/v1/', (req, res) => {
  successResponse(res, statusCodes.success, messages.welcome);
});

app.all('*', (req, res) => errorResponse(res, statusCodes.created, messages.notFound));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

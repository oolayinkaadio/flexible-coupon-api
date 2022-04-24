const express = require('express');

import { router } from './routes';
import { errorResponse, statusCodes, successResponse } from './utils';

const app = express();

app.use(express.json());

const port = process.env.PORT || 4200;

app.use('/api/v1', router);

app.get('/api/v1', (req, res) => {
  successResponse(res, 200, messages.welcome);
});

app.all('*', (req, res) => errorResponse(res, statusCodes.created, messages.notFound));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

import express from 'express';

import usersRouter from './user.routes';

const routes = express.Router();

routes.use('/users', usersRouter);

export default routes;

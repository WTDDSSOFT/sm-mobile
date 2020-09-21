import express from 'express';

import usersRouter from './user.routes';
import doctorRouter from './doctor.routes';
import attendanceRouter from './attendance.routes';
import sessionsRouter from './sessions.routes';

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/doctor', doctorRouter);
routes.use('/attendance', attendanceRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

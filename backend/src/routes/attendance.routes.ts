import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAttendanceService from '../services/CreateAttendanceService';
import AttendanceReposiory from '../repositories/AttendanceReposiory';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const attendanceRouter = Router();

attendanceRouter.use(ensureAuthenticated);

attendanceRouter.get('/', async (request, response) => {
  const attendanceReposiory = getCustomRepository(AttendanceReposiory);
  const attendace = await attendanceReposiory.find();

  return response.json(attendace);
});

attendanceRouter.post('/', async (request, response) => {
  try {
    const patient_id = request.user.id;
    const { doctor_id, attendance_doctor_paitent, date } = request.body;

    const paserDate = parseISO(date);

    const createAttendace = new CreateAttendanceService();

    const attendace = await createAttendace.execute({
      doctor_id,
      patient_id,
      date: paserDate,
      attendance_doctor_paitent,
    });

    return response.json(attendace);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.mesage });
  }
});

export default attendanceRouter;

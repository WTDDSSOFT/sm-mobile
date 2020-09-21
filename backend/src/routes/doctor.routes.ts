import { Router } from 'express';

import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';
import CreateDoctorService from '../services/CreateDoctorService';
// import FindDoctorAttendanceSerivce from '../services/FindDoctorAttendanceSerivce';

const doctorRouter = Router();

doctorRouter.get('/', async (request, response) => {
  const attendanceReposiory = getRepository(Doctor);
  const doctors = await attendanceReposiory.find();

  return response.json(doctors);
});

// doctorRouter.post('/listCrm', async (request, response) => {
//   const { crm } = request.body;

//   const createCrm = new FindDoctorAttendanceSerivce();
//   const doctorCrm = await createCrm.execute({
//     crm,
//   });

//   return response.json(doctorCrm);
// });

doctorRouter.post('/', async (request, response) => {
  try {
    const { name, crm, specialization, email, password } = request.body;

    const createDcotor = new CreateDoctorService();

    const user = await createDcotor.execute({
      name,
      crm,
      specialization,
      email,
      password,
    });

    return response.status(200).json(user);
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.mesage });
  }
});

export default doctorRouter;

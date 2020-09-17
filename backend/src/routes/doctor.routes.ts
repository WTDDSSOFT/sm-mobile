import { response, Router } from 'express';

import CreateDoctorService from '../services/CreateDoctorService';

const doctorRouter = Router();

doctorRouter.post('/', async (request, response) => {
  try {
    const {  name, crm , specialization } = request.body;

    const createDcotor = new CreateDoctorService();

    const user = await createDcotor.execute({
      name,
      crm,
      specialization
    });

    return response.status(200).json(user);
  } catch (err) {
    console.log(err)
    return response.status(400).json({ error: err.mesage });
  }
});

export default createDcotor;

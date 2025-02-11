import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, plan, phone, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      plan,
      phone,
      email,
      password,
    });

    return response.status(200).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.mesage });
  }
});

export default usersRouter;

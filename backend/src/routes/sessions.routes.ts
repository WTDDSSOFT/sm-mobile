import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticaUser = new AuthenticateUserService();

    const { user, token } = await authenticaUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: err.mesage });
  }
});
export default sessionsRouter;

import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../errors/AppError';
import AuthConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const doctorRepository = getRepository(User);

    const user = await doctorRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorret email/password combination');
    }
    console.log(user);

    const passwordMachted = await compare(password, user.password);
    console.log(passwordMachted);

    if (!passwordMachted) {
      throw new AppError('Incorret email/password combination');
    }
    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

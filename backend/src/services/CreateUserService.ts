import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  phone: string;
  plan: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({
    name,
    phone,
    plan,
    email,
    password,
  }: Request): Promise<User> {
    /** Creted of the user  respository */
    const usersReposiotory = getRepository(User);

    /** Created business  rules */
    const checkUserExists = await usersReposiotory.findOne({
      where: { email },
    });

    const hashPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError('Email address alredy used');
    }

    const user = usersReposiotory.create({
      name,
      plan,
      phone,
      email,
      password: hashPassword,
    });

    await usersReposiotory.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;

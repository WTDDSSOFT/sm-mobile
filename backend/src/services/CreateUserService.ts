import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  phone: string;
  plan: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, phone, plan ,password}: Request): Promise<User> {
    /** Creted of the user  respository */
    const usersReposiotory = getRepository(User);

    /** Created business  rules */
    const checkUserExists = await usersReposiotory.findOne({
      where: { name },
    });

    if (checkUserExists) {
      throw new Error('Email address alredy used');
    }

    const user = usersReposiotory.create({
      name,
      plan,
      phone,
      password,
    });

    await usersReposiotory.save(user);

    delete user.password;
    
    return user;
  }
}

export default CreateUserService;

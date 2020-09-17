import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';

interface Request {
  name: string;
  crm: string;
  specialization: string;
}
class CreateDoctorService {
  public async execute({ name, crm, specialization}: Request): Promise<Doctor> {
    /** Creted of the user  respository */
    const doctorReposiotory = getRepository(Doctor);

    /** Created business  rules */
    const checkUserExists = await doctorReposiotory.findOne({
      where: { name },
    });

    if (checkUserExists) {
      throw new Error('Email address alredy used');
    }

    const user = doctorReposiotory.create({
      name,
      crm,
      specialization,
    });

    await doctorReposiotory.save(user);

    delete user.password;
    
    return user;
  }
}

export default CreateUserService;

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Doctor from '../models/Doctor';

interface Request {
  name: string;
  crm: string;
  email: string;
  password: string;
  specialization: string;
}
class CreateDoctorService {
  public async execute({
    name,
    crm,
    specialization,
    email,
    password,
  }: Request): Promise<Doctor> {
    const attendanceReposiory = getCustomRepository(DoctorAttendanceRepository);
    const doctors = await attendanceReposiory.findByCrm({ where: { crm } });

    const doctorReposiotory = getRepository(Doctor);

    const checkDoctorExists = await doctorReposiotory.findOne({
      where: { crm },
    });
    const hashPassword = await hash(password, 8);

    if (checkDoctorExists) {
      throw new AppError('Email address alredy used');
    }

    const doctor = doctorReposiotory.create({
      name,
      crm,
      specialization,
      email,
      password: hashPassword,
    });

    await doctorReposiotory.save(doctor);

    delete doctor.passsowrd;

    return doctor;
  }
}

export default CreateDoctorService;

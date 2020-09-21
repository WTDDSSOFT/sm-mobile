import { getCustomRepository } from 'typeorm';
import DoctorAttendanceRepository from '../repositories/DoctorAttendancesRepository';
import AppError from '../errors/AppError';

import Attendance from '../models/attendance';

interface Request {
  crm: string;
}
class FindDoctorAttendanceSerivce {
  public async execute({ crm }: Request): Promise<Attendance> {
    const doctorAttendanceReposiory = getCustomRepository(
      DoctorAttendanceRepository,
    );

    const findAattendanceInSameDate = await doctorAttendanceReposiory.findByCrm(
      crm,
    );

    if (findAattendanceInSameDate) {
      throw new AppError('This attendance is already booked');
    }

    const attendance = doctorAttendanceReposiory.create({
      crm,
    });

    await doctorAttendanceReposiory.save(attendance);

    return attendance;
  }
}

export default FindDoctorAttendanceSerivce;

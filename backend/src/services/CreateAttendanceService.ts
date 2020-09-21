import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Attendance from '../models/attendance';
import AttendanceReposiory from '../repositories/AttendanceReposiory';

interface Request {
  doctor_id: string;
  patient_id: string;
  attendance_doctor_paitent: string;
  date: Date;
}
class CreateAttendanceService {
  public async execute({
    date,
    doctor_id,
    patient_id,
    attendance_doctor_paitent,
  }: Request): Promise<Attendance> {
    const attendanceReposiory = getCustomRepository(AttendanceReposiory);

    const attendanceDate = startOfHour(date);

    const findAattendanceInSameDate = await attendanceReposiory.findByDate(
      attendanceDate,
    );

    if (findAattendanceInSameDate) {
      throw new AppError('This attendance is already booked');
    }

    const attendance = attendanceReposiory.create({
      doctor_id,
      date: attendanceDate,
      patient_id,
      attendance_doctor_paitent,
    });

    await attendanceReposiory.save(attendance);

    return attendance;
  }
}

export default CreateAttendanceService;

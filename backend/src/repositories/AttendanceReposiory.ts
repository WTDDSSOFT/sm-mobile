import { EntityRepository, Repository } from 'typeorm';

import Attendance from '../models/attendance';

@EntityRepository(Attendance)
class AttendanceRepository extends Repository<Attendance> {
  public async findByDate(date: Date): Promise<Attendance | null> {
    const findAppointments = await this.findOne({
      where: { date },
    });
    return findAppointments || null;
  }
}

export default AttendanceRepository;

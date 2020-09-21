import { EntityRepository, Repository } from 'typeorm';

import Attendance from '../models/attendance';

@EntityRepository(Attendance)
class DoctorAttendanceRepository extends Repository<Attendance> {
  public async findByCrm(crm: string): Promise<Attendance | null> {
    const findAppointments = await this.findOne({
      where: { crm },
    });
    return findAppointments || null;
  }
}

export default DoctorAttendanceRepository;

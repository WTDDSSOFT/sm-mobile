import { EntityRepository, Repository } from 'typeorm';

// import Appointement from '../models/Appointments';

@EntityRepository(Appointement)
class AppointementsRepository extends Repository<Appointement> {
  // aqui e uma interface Repository<Appointement> <- parametro de uma tipagem recebe o model
  public async findByDate(date: Date): Promise<Appointement | null> {
    const findAppointments = await this.findOne({
      where: { date },
    });
    // aqui e um else(si não).
    return findAppointments || null;
  }
}

export default AppointementsRepository;

import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddDcotorIdAttendance1600458001332
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('attendance', 'doctor');
    await queryRunner.addColumn(
      'attendance',
      new TableColumn({
        name: 'doctor_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'attendance',
      new TableForeignKey({
        name: 'attendanceDoctorId',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'SET NULL ',
        onUpdate: 'CASCADE',
      }),
    );
  }

  /** disfar na ordem reversa */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attendance', 'attendanceDoctorId');

    await queryRunner.dropColumn('attendance', 'doctor_id');
    await queryRunner.addColumn(
      'attendance',
      new TableColumn({
        name: 'doctor',
        type: 'varchar',
      }),
    );
  }
}

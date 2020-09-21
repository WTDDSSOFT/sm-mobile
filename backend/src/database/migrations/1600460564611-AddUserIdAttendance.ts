import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdAttendance1600460564611
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('attendance', 'patient');
    await queryRunner.addColumn(
      'attendance',
      new TableColumn({
        name: 'patient_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'attendance',
      new TableForeignKey({
        name: 'attendanceUserId',
        columnNames: ['patient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL ',
        onUpdate: 'CASCADE',
      }),
    );
  }

  /** disfar na ordem reversa */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attendance', 'attendanceUserId');

    await queryRunner.dropColumn('attendance', 'patient_id');

    await queryRunner.addColumn(
      'attendance',
      new TableColumn({
        name: 'patient',
        type: 'varchar',
      }),
    );
  }
}

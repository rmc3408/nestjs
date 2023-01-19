import { ReportEntity } from '../report/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => ReportEntity, report => report.user)
  reports: ReportEntity[];

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  @AfterUpdate()
  logInsert() {
    console.log('Changes in user id = ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user id = ', this.id);
  }
}
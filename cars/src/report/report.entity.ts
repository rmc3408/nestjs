import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  mileage: number;

  @ManyToOne(type => UserEntity, user => user.reports)
  user: UserEntity;
}
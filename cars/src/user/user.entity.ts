import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  
  // Inject repository user from TypeORM with all pre-made functions
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}
  
  create(user) {
    const newUser = this.repo.create(user); // create a entity
    return this.repo.save(newUser); //save entity (executing hooks) or just data
  }

  findOneUser(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAllUsers(email: string) {
    return this.repo.find({ where: { email } });
  }

  async updateUser(id: number, data: Partial<UserEntity>) {
    const foundUser = await this.findOneUser(id);
    if (!foundUser) throw new NotFoundException('user not found');
    Object.assign(foundUser, data);
    return this.repo.save(foundUser);
  }

  async removeUser(id: number) {
    const foundUser = await this.findOneUser(id);
    if (!foundUser) throw new NotFoundException('user does not exist');
    return this.repo.remove(foundUser);
  }
}

import { Injectable } from '@nestjs/common';
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
}

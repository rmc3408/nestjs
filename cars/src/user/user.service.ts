import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}
  
  create(user) {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }
}

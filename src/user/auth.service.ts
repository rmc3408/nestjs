import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { hashing, verifyHash } from './functions-auth';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
  
  // Inject UserService inside
  constructor(private userRepo: UserService) {}
  
  async signIn(user) {
    const { email, password } = user;
    // Check if email's user exist.
    const userFound = await this.userRepo.findAllUsers(email);
    if (!userFound.length) throw new NotFoundException('User not found, please first signUp!');

    // Collect salt value and verify hash
    const databasePassword = userFound[0].password;
    const isEqualPassword = await verifyHash(password, databasePassword);

    if (!isEqualPassword) throw new UnauthorizedException();
    return userFound[0];
  }

  async signUp(user) {
    const { email, password } = user;
    // Check if email's user exist.
    const userFound = await this.userRepo.findAllUsers(email);
    if (userFound.length) throw new BadRequestException('User found already exist!');

    // Hash the users password
    const hashedPassword = await hashing(password);

    // Create user and save
    return this.userRepo.create({ email, password: hashedPassword });
  }

}

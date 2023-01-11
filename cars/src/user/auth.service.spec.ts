import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';


// Mocking value of checking Passwords.
jest.mock('./functions-auth.ts', () => {
  return {
    verifyHash: jest.fn()
      .mockImplementationOnce(() => Promise.resolve('true'))
      .mockImplementationOnce(() => { throw new UnauthorizedException('Unauthorized')})
      .mockImplementationOnce(() => 'Third call'),
    hashing: jest.fn().mockResolvedValue('011d7db45b18dbad.69f556e9'),
  };
});
const mockedVerifyHash = require('./functions-auth');


const fakeUser = { email: 'a@a.com', password: 'secret@123' };
const userAllFound = [
  { id: 1, email: 'a@a.com', password: '011d7db45b18dbad.69f556e9' },
  { id: 2, email: 'b@a.com', password: '0sfkssnf5b18good.28173844' }
 ];
let mockedAuthService: AuthService;
let fakeUserService: Partial<UserService> = {
  findAllUsers: jest.fn().mockResolvedValue([] as UserEntity[]),
  create: (_user) => Promise.resolve([] as UserEntity[]),
};

beforeAll(async () => {
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UserService,
        useValue: fakeUserService,
      },
    ],
  }).compile();

  mockedAuthService = module.get(AuthService);
});

beforeEach(() => {
  fakeUserService.findAllUsers = () => Promise.resolve([] as UserEntity[]);
})


describe('Auth Service- SIGN UP', () => {
  it('Create Auth Service instance class', async () => {
    expect(mockedAuthService).toBeDefined();
  });

  it('Should signUP user and verify user already exist', async () => {
    fakeUserService.findAllUsers = () => Promise.resolve(userAllFound as UserEntity[]);
    await expect(mockedAuthService.signUp(fakeUser)).rejects.toThrow('User found already exist!');
    await expect(mockedAuthService.signUp(fakeUser)).rejects.toThrow(BadRequestException);
  });

  it('Should signUP user and save user create', async () => {
    fakeUserService.create = (_user) => Promise.resolve(userAllFound as UserEntity[])
    await expect((await mockedAuthService.signUp(fakeUser))[0]).toEqual(userAllFound[0]);
  });
});

describe('Auth Service- SIGN IN', () => {
  test('Should throw error if new user try to signIN without signup first', async () => {
    try {
      await mockedAuthService.signIn(fakeUser);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'User not found, please first signUp!');
    }
  });

  it('return a user if is right password', async () => {
    fakeUserService.findAllUsers = () => Promise.resolve(userAllFound as UserEntity[]);
    const user = await mockedAuthService.signIn(fakeUser);
    expect(user).toBeDefined();
    expect(user.password).toEqual('011d7db45b18dbad.69f556e9')
  });

  test('Should throw error if password is wrong', async () => {
    fakeUserService.findAllUsers = () => Promise.resolve(userAllFound as UserEntity[]);
    
    try {
      await mockedAuthService.signIn(fakeUser);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error).toHaveProperty('message', 'Unauthorized');
    }
    console.log(mockedVerifyHash.verifyHash())
    expect(mockedVerifyHash.verifyHash.mock.results[1].type).toBe('throw')
  });
})

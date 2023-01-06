import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

describe('Auth Service', () => {
  const fakeUser = { email: 'a@a.com', password: 'secret@123' };

  // Passwords is same.
  jest.mock('./functions-auth.ts', () => {
    return {
      verifyHash: jest.fn().mockResolvedValue(true),
      hashing: jest.fn().mockResolvedValue('011d7db45b18dbad.69f556e9'),
    };
  });

  let mockedAuthService: AuthService;
  let fakeUserService: Partial<UserService> = {
    findAllUsers: jest.fn().mockResolvedValue([] as UserEntity[]),
    create: (_user) => Promise.resolve([{ id: 36, email: 'a@a.com', password: '011d7db45b18dbad.69f556e9' }] as UserEntity[]),
  };

  beforeEach(async () => {
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
    fakeUserService.findAllUsers = () => Promise.resolve([] as UserEntity[]);
  });

  it('Create Auth Service instance class', async () => {
    expect(mockedAuthService).toBeDefined();
  });

  it('New user with a salted and hashed password', async () => {
    const user = await mockedAuthService.signUp(fakeUser);
    expect(mockedAuthService).toBeDefined();
    expect(user[0].password).not.toEqual(fakeUser.password);
  });

  it('First time unused email in signIN throw error', async () => {
    try {
      await mockedAuthService.signIn(fakeUser);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'User not found, please first signUp!' );
    }
  });

  it('Signs up with USED email', async () => {
    fakeUserService.findAllUsers = () => 
      Promise.resolve([{ id: 1, email: 'a@a.com', password: '011d7db45b18dbad.69f556e9' }] as UserEntity[]);
    await expect(mockedAuthService.signUp(fakeUser)).rejects.toThrow(BadRequestException);
  });

  it('return a user if is right password', async () => {
    fakeUserService.findAllUsers = jest.fn().mockClear();
    fakeUserService.findAllUsers = () => Promise.resolve([
        { email: 'a@a.com', password: '011d7db45b18dbad.69f556e9' },
      ] as UserEntity[]);
    const user = await mockedAuthService.signIn({email: 'a@a.com', password: 'secret@123'});
    await expect(user).toBeDefined();
  });

  it('throws if an invalid password is provided', async () => {
    jest.clearAllMocks();

    fakeUserService.findAllUsers = () => Promise.resolve([] as UserEntity[]);
    jest.mock('./functions-auth.ts', () => {
      return {
        verifyHash: jest.fn().mockResolvedValue(false),
        hashing: jest.fn().mockResolvedValue('011d7db45b18dbad.69f556e9-wrong'),
      };
    });
    await mockedAuthService.signUp(fakeUser);
    await expect(mockedAuthService.signIn(fakeUser)).rejects.toThrow();
  });
});


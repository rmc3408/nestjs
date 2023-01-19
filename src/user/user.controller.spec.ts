import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const fakeUser = { email: 'user@gmail.com', password: 'secret@123' };

  let fakeUserService: Partial<UserService> = {
    findOneUser: jest.fn().mockImplementation(
      (id: string) => Promise.resolve({ ...fakeUser, id })),
    findAllUsers: jest.fn().mockImplementation(
      (email: string) => Promise.resolve([{ ...fakeUser, id: 20 }] as UserEntity[])),
    removeUser: jest.fn(),
    updateUser: jest.fn()
  }
  let fakeAuthService: Partial<AuthService> = {
    signIn: jest.fn().mockImplementation((user) => {
      return Promise.resolve({ ...fakeUser, id: 136 });
    }),
    signUp: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService},
        { provide: UserService, useValue: fakeUserService},
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all user function', async () => {
    const user = await controller.findAllUser('user@gmail.com');
    expect(user.length).toBe(1);
    expect(user[0].email).toEqual('user@gmail.com');
  });

  it('find ONE user function', async () => {
    const user = await controller.findUser("20");
    expect(user.id).toBe(20);
    expect(user.email).toEqual('user@gmail.com');
  });

  it('find ONE user function get no users', async () => {
    fakeUserService.findOneUser = jest.fn().mockImplementation(() => null)
    expect(await controller.findUser("20")).toBeNull();
  });

  it('SingIN get user and session userID', async () => {
    const session = { userId: 0 };
    const user = await controller.signInUser(fakeUser, session);
    expect(user).not.toBe(1);
    expect(user.id).toBe(136);
    expect(session.userId).toBe(136);
  });

});

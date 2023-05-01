import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const user = new User('1', 'Val Zenn', 'val.zenn@email.com');
    const createdUser = await userService.create(user);
    expect(createdUser).toEqual(user);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await userService.findAll();
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(new User('1', 'Val Zenn', 'val.zenn@email.com'));
    });
  });

  describe('findOne', () => {
    it('should return a user with the given id', async () => {
      const user = await userService.findOne('1');
      expect(user).toEqual(new User('1', 'Val Zenn', 'val.zenn@email.com'));
    });

    it('should return undefined if no user is found', async () => {
      const user = await userService.findOne('2');
      expect(user).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a user with the given id', async () => {
      const updatedUser = new User('1', 'Val Z', 'val.z@email.com');
      const user = await userService.update('1', updatedUser);
      expect(user).toEqual(updatedUser);

      const foundUser = await userService.findOne('1');
      expect(foundUser).toEqual(updatedUser);
    });

    it('should return undefined if no user is found', async () => {
      const updatedUser = new User('2', 'Nix Ber', 'nix.ber@example.com');
      const user = await userService.update('2', updatedUser);
      expect(user).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete a user with the given id', async () => {
      await userService.delete('1');
      const users = await userService.findAll();
      expect(users).toHaveLength(0);
    });

    it('should return undefined if no user is found', async () => {
      const user = await userService.delete('2');
      expect(user).toBeUndefined();
    });
  });
});

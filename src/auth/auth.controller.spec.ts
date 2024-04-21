import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { User } from '../user/user.entity'; // Import User interface or entity

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return token and user on successful login', async () => {
      // Mock input data
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Mock user data
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword', // Include password
        role: 'user', // Include role
        // other user properties...
      };

      // Mock the return values of AuthService and UserService methods
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'login').mockResolvedValue('mockAuthToken');
      jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValue(Promise.resolve(mockUser)); // wrap the mock user object with Promise.resolve()

      // Call the login method on the controller
      const result = await controller.login(loginDto);

      // Assert the result
      expect(result).toEqual({
        token: 'mockAuthToken',
        user: mockUser,
        success: true,
      });
    });
  });
});

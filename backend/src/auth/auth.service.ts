import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/user.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto.js';
import { GoogleAuthDto } from './dto/google.dto.js';
import { DispatchUser, IUser } from '../users/interfaces/user.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
    const existingUser = await this.usersService.findOneByEmail(
      registerUserDto.email,
    );

    if (existingUser)
      throw new ConflictException({
        code: 'ALREADY_EXIST',
        message: 'user already exist',
      });

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.usersService.findOneSensitiveByEmail(
      loginUserDto.email,
    );
    if (!user) {
      throw new NotFoundException({
        code: 'NOT_FOUND_EXCEPTION',
        message: 'user not found',
      });
    }

    const isAuthenticated = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if(!isAuthenticated) throw new UnauthorizedException({code : 'UNAUTHORIZE', message : 'email or password is Incorrect'});

    const payload = {id : user.id, email:user.email, username : user.username, role : user.role}

    return this.jwtService.sign(payload)
  }

  async googleAuth (googleDto : GoogleAuthDto) {
     let user = await this.usersService.findOneByGoogleID(googleDto.googleId)
     let payload = {}
     if (!user) {
        user = await this.usersService.findOneByEmail(googleDto.email) 
     }

     if (!user) {
      user  = await this.usersService.createWithGoogle(googleDto)
     }

     payload = { id : user.id, email : user.email, username : user.username, role : user.role}

     return await this.jwtService.sign(payload)
  }

  async getMe(id : number) : Promise<DispatchUser | null> {
    const result =  await this.usersService.findOne(id)
    return result as DispatchUser
  }
}

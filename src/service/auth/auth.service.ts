import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/users/create-user.dto';
import { UpdateUserDto } from '../../dto/users/update-user.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { LoginDto } from 'src/dto/auth/login.dto';

@Injectable()
export class AuthService {
    register(registerDto: RegisterDto) {
        return 'This action adds a new user';
    }

    login(loginDto: LoginDto) {
        return `This action returns a #${loginDto} user`;
    }
}

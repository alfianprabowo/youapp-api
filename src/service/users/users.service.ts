import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/users/create-user.dto';
import { UpdateUserDto } from '../../dto/users/update-user.dto';

@Injectable()
export class UserService {
  create(accessToken: string, createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(accessToken: string) {
    return `This action returns a #${accessToken} user`;
  }

  update(accessToken: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${accessToken} user`;
  }

}

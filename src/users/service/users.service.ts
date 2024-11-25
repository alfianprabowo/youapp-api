import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private userModel: Model<IUser>) { }

  async findOne(username: string) {
    return await this.userModel.findOne((user: { username: string; }) => user.username === username);
  }

  async createProfile(accessToken: string, createUserDto: CreateUserDto): Promise<IUser> {
    const data = new this.userModel(createUserDto);
    return data.save();
    // return 'This action adds a new user';
  }

  getProfile(accessToken: string) {
    return `This action returns a #${accessToken} user`;
  }

  async updateProfile(accessToken: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const data = await this.userModel.findOneAndUpdate({ accessToken: accessToken },
      updateUserDto, { new: true }
    );

    if (!data) {
      throw new NotFoundException(`User #${this.userModel} not found`);
    }
    return data;
    // return `This action updates a #${accessToken} user`;
  }

}

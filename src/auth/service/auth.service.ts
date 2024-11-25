import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interface/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<IUser>,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, username, password } = loginDto;
        const user = await this.userModel.findOne(
            {
                $or: [
                    { email: email },
                    { username: username },
                ]
            },
        );

        if (!user) {
            return {
                status: 201,
                message: "User not found",
            };
            // throw new UnauthorizedException('invalid email or username');
        } else {

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return {
                    status: 201,
                    message: "Incorrect password",
                };
                // throw new UnauthorizedException('invalid email or username');
            } else {

                const access_token = await this.jwtService.signAsync(
                    { email: user.email },
                    {
                        secret: process.env.JWT_SECRET,
                        // expiresIn: process.env.JWT_EXPIRES, 
                    },
                );
                return {
                    status: 200,
                    access_token: access_token
                };
            }
        }
    }

    async register(registerDto: RegisterDto) {
        const { email, username, password } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        // ! CHECK USER FIRST IF !USER

        const user = await this.userModel.create({
            email,
            username,
            password: hashedPassword,
        });

        await user.save();

        const access_token = await this.jwtService.signAsync(
            { email: user.email },
            {
                secret: process.env.JWT_SECRET,
                // expiresIn: process.env.JWT_EXPIRES, 
            }
        );

        return { access_token };
        // return 'This action adds a new user';
    }
}
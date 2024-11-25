import { Controller, Post, Body, Headers, Res, HttpStatus, InternalServerErrorException, HttpException } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { ApiCreatedResponse, ApiOkResponse, } from '@nestjs/swagger';
import { LoginDto } from "src/auth/dto/login.dto";
import { RegisterDto } from "src/auth/dto/register.dto";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({
        description: 'User has been logged in'
    })
    async login(@Res() response: any, @Body() loginDto: LoginDto) {
        try {
            var result = await this.authService.login(loginDto);
            var status = "";
            var message = "";
            var access_token = "";
            for (const key in result) {
                if (result.hasOwnProperty(key)) {
                    if (key == "status") {
                        status = `${result[key]}`
                    }
                    if (key == "message") {
                        message = `${result[key]}`
                    }
                    if (key == "access_token") {
                        access_token = `${result[key]}`
                    }
                }
            }
            if (status === "200") {
                return response.status(HttpStatus.OK).json({
                    message: 'User has been logged in successfully',
                    access_token: `${access_token}`,
                });
            } else {
                return response.status(HttpStatus.CREATED).json({
                    message: `${message}`,
                });
            }
        } catch (err) {
            return response.status(err.status).json(
                err.response
            );
        }

    }

    @Post('register')
    @ApiCreatedResponse({
        description: 'User has been created successfully'
    })
    async register(@Res() response: any, @Body() registerDto: RegisterDto) {
        try {
            const result = await this.authService.register(registerDto);
            var status = "";
            var message = "";
            for (const key in result) {
                if (result.hasOwnProperty(key)) {
                    if (key == "status") {
                        status = `${result[key]}`
                    }
                    if (key == "message") {
                        message = `${result[key]}`
                    }
                }
            }
            if (status === "200") {
                return response.status(HttpStatus.OK).json({
                    message: 'User has been created successfully',
                });
            } else {
                return response.status(HttpStatus.CREATED).json({
                    message: `${message}`,
                });
            }
        } catch (err) {
            throw err.status == undefined
                ? new InternalServerErrorException()
                : new HttpException(err, err.status);
            // return response.status(err.status).json(
            //     err.response
            // );
        }
    }
}
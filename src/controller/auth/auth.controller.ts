import { Controller, Post, Body, Headers } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";
import { ApiCreatedResponse, ApiOkResponse, } from '@nestjs/swagger';
import { LoginDto } from "src/dto/auth/login.dto";
import { RegisterDto } from "src/dto/auth/register.dto";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({
        description: 'User has been logged in'
    })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiCreatedResponse({
        description: 'User has been created successfully'
    })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
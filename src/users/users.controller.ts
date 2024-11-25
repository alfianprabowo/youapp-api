import { Controller, Get, Post, Body, Put, Headers, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse } from '@nestjs/swagger';

@Controller('api')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post('createProfile')
    @ApiHeader({
        name: 'x-access-token',
        required: false,
        description: 'Access Token',
    })
    @ApiCreatedResponse({
        description: 'Profile has been created'
    })
    async createProfile(@Headers('x-access-token') accessToken: string, @Body() createUserDto: CreateUserDto) {
        // try {
        //     const data = this.userService.updateProfile(accessToken, updateUserDto);
        //     return response.status(HttpStatus.OK).json({
        //         message: 'Profile has been updated successfully',
        //         data,
        //     });
        // } catch (err) {
        //     return response.status(err.status).json(err.response);
        // }
        return this.userService.createProfile(accessToken, createUserDto);
    }

    @Get('getProfile')
    @ApiHeader({
        name: 'x-access-token',
        required: false,
        description: 'Access Token',
    })
    @ApiOkResponse({
        description: 'Profile has been found'
    })
    getProfile(@Headers('x-access-token') accessToken: string) {
        // try {
        //     const data = this.userService.updateProfile(accessToken, updateUserDto);
        //     return response.status(HttpStatus.OK).json({
        //         message: 'Profile has been updated successfully',
        //         data,
        //     });
        // } catch (err) {
        //     return response.status(err.status).json(err.response);
        // }
        return this.userService.getProfile(accessToken);
    }

    @Put('updateProfile')
    @ApiHeader({
        name: 'x-access-token',
        required: false,
        description: 'Access Token',
    })
    @ApiOkResponse({
        description: 'Profile has been updated'
    })
    async updateProfile(@Res() response: any, @Headers('x-access-token') accessToken: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const data = this.userService.updateProfile(accessToken, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'Profile has been updated successfully',
                data,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    // return this.userService.updateProfile(accessToken, updateUserDto);
}



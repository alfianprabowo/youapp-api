import { Controller, Get, Post, Body, Put, Headers } from '@nestjs/common';
import { UserService } from '../../service/users/users.service';
import { CreateUserDto } from '../.././dto/users/create-user.dto';
import { UpdateUserDto } from '../.././dto/users/update-user.dto';
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
    create(@Headers('x-access-token') accessToken: string, @Body() createUserDto: CreateUserDto) {
        return this.userService.create(accessToken, createUserDto);
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
    findOne(@Headers('x-access-token') accessToken: string) {
        return this.userService.findOne(accessToken);
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
    update(@Headers('x-access-token') accessToken: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(accessToken, updateUserDto);
    }

}

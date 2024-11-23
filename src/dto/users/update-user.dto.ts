import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsArray, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    birthday: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    height: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    weight: number;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    interests: [string];
}

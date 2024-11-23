import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './service/users/users.service';
import { UsersController } from './controller/users/users.controller';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/youAppApi')],
  controllers: [UsersController, AuthController],
  providers: [AppService, UserService, AuthService],
  // imports: [UserService],
})
export class AppModule { }

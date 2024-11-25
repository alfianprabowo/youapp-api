import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users/service/users.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/youAppApi'),
    UsersModule,
    AuthModule,
  ],
  // providers: [AppService,],
  // controllers: [UsersController,],
  // providers: [AppService, UserService,],
  // imports: [UserService],
})
export class AppModule { }

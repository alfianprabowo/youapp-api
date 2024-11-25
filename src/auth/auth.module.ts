import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./service/auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema,
        }]),
        // UsersModule,
    ],
    providers: [
        AuthService,
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
    ],
    controllers: [AuthController],
    // exports: [AuthService],
})
export class AuthModule { }
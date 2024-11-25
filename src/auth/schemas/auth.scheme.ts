import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Auth {
    @Prop()
    email: string;

    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

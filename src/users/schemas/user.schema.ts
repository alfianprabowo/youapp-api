import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User {
    @Prop({
        unique: true,
    })
    email: string;

    @Prop()
    username: string;

    @Exclude()
    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    birthday: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    interests: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
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

export const AuthSchema = SchemaFactory.createForClass(User);

import { Document } from 'mongoose';
export interface IUser extends Document {
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly name: string;
    readonly birthday: string;
    readonly height: number;
    readonly wieght: number;
    readonly interests: [string];
}
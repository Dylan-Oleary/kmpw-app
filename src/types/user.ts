import { Dog, Weather } from "@/types";

export type User = {
    id: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    reauthenticationAt: Date;
    email: string;
    dogs: Dog[];
    weather?: Weather;
};

export interface IUser {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
}

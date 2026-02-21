import type { User } from "../user/userTypes.ts";

export interface Book {
    _id: String;
    title: String;
    description: string;
    author: User;
    genre: String;
    file: String;
    coverImage: String;
    createdAt: Date;
    updatedAt: Date;
}

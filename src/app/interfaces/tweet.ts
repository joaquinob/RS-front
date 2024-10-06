import { User } from "./user";

export interface Tweet {
    _id: string,
    user: User,
    text: string,
    likes: number,
    comments: string[]
}

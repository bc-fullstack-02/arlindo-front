import { UserInfo } from "./UserInfo";

export interface Post {
    _id: string;
    title: string;
    description: string;
    img: string;
    profile: {
        name: string;
    };
    user: UserInfo;
    comments: string[];
    likes: Like[];
}

export interface Like {
    _id: string;
    user: string;
    post: string;
    updatedAt: Date;
    createdAt: Date;
}
export interface Comment {
    _id: string;
    description: string;
    user: string;
    post: string;
    updatedAt: Date;
    createdAt: Date;
}
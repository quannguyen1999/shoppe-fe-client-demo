import { Emotion } from "./emotion.model";

export interface referComment {
    id: number,
    username: string;
    comment: string;
}


export interface Comment {
    id: number;
    username: string;
    comment: string;
    dateCreated: Date;
    avatar: string;
    emotions: Array<Emotion>;
    referComment?: referComment;
    isElementVisible?: boolean | false;
}



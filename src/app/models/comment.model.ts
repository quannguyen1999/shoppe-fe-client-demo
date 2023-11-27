import { Emotion } from "./emotion.model";

export interface Comment {
    id: number;
    username: string;
    comment: string;
    dateCreated: Date;
    avatar: string;
    emotions: Array<Emotion>;
}



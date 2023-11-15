import { Author } from "./Author";

export class Article {
    id?: number;
    title?: string;
    content?: string;
    author!: Author;
}

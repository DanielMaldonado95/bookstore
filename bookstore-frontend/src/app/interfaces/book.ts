import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    bookId: number;
    name: string;
    datePremiered: Date;
    author: Author;
    genre: Genre;
}

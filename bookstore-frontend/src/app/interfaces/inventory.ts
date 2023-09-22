import { Book } from "./book";

export interface Inventory {
    inventoryId: number;
    book: Book;
    price: number;
    quantity: number
}

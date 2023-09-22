import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './views/author/authors/authors.component';
import { AuthorFormComponent } from './views/author/author-form/author-form.component';
import { HomeComponent } from './views/home/home.component';
import { GenresComponent } from './views/genre/genres/genres.component';
import { GenreFormComponent } from './views/genre/genre-form/genre-form.component';
import { BooksComponent } from './views/book/books/books.component';
import { BookFormComponent } from './views/book/book-form/book-form.component';
import { InventoriesComponent } from './views/inventory/inventories/inventories.component';
import { InventoryFormComponent } from './views/inventory/inventory-form/inventory-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'author', component: AuthorFormComponent },
  { path: 'author/:id', component: AuthorFormComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genre', component: GenreFormComponent },
  { path: 'genre/:id', component: GenreFormComponent },
  { path: 'books', component: BooksComponent },
  { path: 'book', component: BookFormComponent },
  { path: 'book/:id', component: BookFormComponent },
  { path: 'inventories', component: InventoriesComponent },
  { path: 'inventory', component: InventoryFormComponent },
  { path: 'inventory/:id', component: InventoryFormComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

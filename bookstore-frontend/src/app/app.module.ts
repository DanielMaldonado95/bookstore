import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './views/author/authors/authors.component';
import { AuthorFormComponent } from './views/author/author-form/author-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { GenresComponent } from './views/genre/genres/genres.component';
import { GenreFormComponent } from './views/genre/genre-form/genre-form.component';
import { BooksComponent } from './views/book/books/books.component';
import { BookFormComponent } from './views/book/book-form/book-form.component';
import { InventoriesComponent } from './views/inventory/inventories/inventories.component';
import { InventoryFormComponent } from './views/inventory/inventory-form/inventory-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorFormComponent,
    NavbarComponent,
    BreadcrumbComponent,
    GenresComponent,
    GenreFormComponent,
    BooksComponent,
    BookFormComponent,
    InventoriesComponent,
    InventoryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicies/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {

  title: string = 'Books';
  books: Book[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' }
  ];

  constructor(
    private router: Router,
    private bookService: BookService) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.bookService.getBooks().subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.close();
              this.books = resp.data;
            } else {
              Swal.fire({
                icon: 'error',
                text: resp.error,
              });
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              text: 'A problem occurred while obtaining the information please try again.',
            });
            console.error(err);
          }
        });
      }
    });
  }
  
  new(): void {
    this.router.navigate(['/book']);
  }

  edit(id: number): void {
    this.router.navigate(['/book', id]);
  }

}

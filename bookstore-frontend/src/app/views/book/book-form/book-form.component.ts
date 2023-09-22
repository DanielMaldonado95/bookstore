import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { Genre } from 'src/app/interfaces/genre';
import { AuthorService } from 'src/app/servicies/author.service';
import { BookService } from 'src/app/servicies/book.service';
import { GenreService } from 'src/app/servicies/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {

  private id: number = 0;
  title: string = 'Book';
  authors: Author[] = [];
  genres: Genre[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' },
    { title: 'Books', route: '/books' }
  ];

  form: FormGroup = new FormGroup({
    bookId: new FormControl(0),
    name: new FormControl(null, [Validators.required]),
    datePremiered: new FormControl(null, [Validators.required]),
    author: new FormControl(null, [Validators.required]),
    genre: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService) { }

  ngOnInit(): void {
    this.findAuthors();
    this.findGenres();
    this.id = this.id = this.params.snapshot.params['id'] !== undefined ? Number(this.params.snapshot.params['id']) : 0;
    if (this.id > 0) this.findBook();
  }

  findAuthors(): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.authorService.getAuthors().subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.close();
              this.authors = resp.data;
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

  findGenres(): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.genreService.getGenres().subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.close();
              this.genres = resp.data;
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

  findBook(): void {
    Swal.fire({
      title: 'Processing information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.bookService.getBook(this.id).subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.close();
              this.form.patchValue(resp.data);
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

  save(): void {
    Swal.fire({
      title: 'Processing information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.bookService.saveBook(this.form.getRawValue()).subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.fire({
                icon: 'info',
                confirmButtonText: 'Ok',
                text: this.id === 0 ? 'Book successfully entered' : 'Book successfully updated',
              }).then((result) => {
                if (result.isConfirmed)
                  this.router.navigate(['/books']);
              });
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

  goBack(): void {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Close',
      text: `It's about to leave. Do you want to continue?`,
    }).then((result) => {
      if (result.isConfirmed) this.router.navigate(['/books']);
    });
  }

  compareWithAuthor(author: Author, author2: Author): boolean {
    return author && author2 && author.authorId === author2.authorId;
  }

  compareWithGenre(genre: Genre, genre2: Genre): boolean {
    return genre && genre2 && genre.genreId === genre2.genreId;
  }
}

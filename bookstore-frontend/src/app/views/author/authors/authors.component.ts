import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { AuthorService } from 'src/app/servicies/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
})
export class AuthorsComponent implements OnInit {

  title: string = 'Authors';
  authors: Author[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' }
  ];

  constructor(
    private router: Router,
    private authorService: AuthorService,) { }

  ngOnInit(): void {
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

  new(): void {
    this.router.navigate(['/author']);
  }

  edit(id: number): void {
    this.router.navigate(['/author', id]);
  }
}

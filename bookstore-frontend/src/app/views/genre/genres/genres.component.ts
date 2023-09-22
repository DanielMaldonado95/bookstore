import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from 'src/app/interfaces/genre';
import { GenreService } from 'src/app/servicies/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
})
export class GenresComponent implements OnInit {

  title: string = 'Genres';
  genres: Genre[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' }
  ];

  constructor(
    private router: Router,
    private genreService: GenreService,) { }

  ngOnInit(): void {
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

  new(): void {
    this.router.navigate(['/genre']);
  }

  edit(id: number): void {
    this.router.navigate(['/genre', id]);
  }
}

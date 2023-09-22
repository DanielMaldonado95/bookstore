import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/servicies/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
})
export class GenreFormComponent implements OnInit {

  private id: number = 0;
  title: string = 'Genre';
  items: any[] = [
    { title: 'Home', route: '/home' },
    { title: 'Genres', route: '/genres' }
  ];

  form: FormGroup = new FormGroup({
    genreId: new FormControl(0),
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private genreService: GenreService,) { }

  ngOnInit(): void {
    this.id = this.id = this.params.snapshot.params['id'] !== undefined ? Number(this.params.snapshot.params['id']) : 0;
    if (this.id > 0)
      this.find();
  }

  find(): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.genreService.getGenre(this.id).subscribe({
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
        this.genreService.saveGenre(this.form.getRawValue()).subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.fire({
                icon: 'info',
                confirmButtonText: 'Ok',
                text: this.id === 0 ? 'Genre successfully entered' : 'Genre successfully updated',
              }).then((result) => {
                if (result.isConfirmed)
                  this.router.navigate(['/genres']);
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
      if (result.isConfirmed) this.router.navigate(['/genres']);
    });
  }
}

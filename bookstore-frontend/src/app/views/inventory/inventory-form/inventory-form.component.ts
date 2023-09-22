import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicies/book.service';
import { InventoryService } from 'src/app/servicies/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
})
export class InventoryFormComponent implements OnInit {

  private id: number = 0;
  title: string = 'Book';
  books: Book[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' },
    { title: 'Inventories', route: '/inventories' }
  ];

  form: FormGroup = new FormGroup({
    inventoryId: new FormControl(0),
    book: new FormControl(null, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required])
  });

  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private bookService: BookService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.findBooks();
    this.id = this.id = this.params.snapshot.params['id'] !== undefined ? Number(this.params.snapshot.params['id']) : 0;
    if (this.id > 0) {
      this.form.get('book')?.disable();
      this.findInventory();
    }
  }

  findInventory(): void {
    Swal.fire({
      title: 'Processing information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.inventoryService.getInventory(this.id).subscribe({
          next: (resp) => {
            if (resp.data) {
              this.form.patchValue(resp.data);
              Swal.close();
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

  findBooks(): void {
    Swal.fire({
      title: 'Processing information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.bookService.getBooks().subscribe({
          next: (resp) => {
            if (resp.data) {
              this.books = resp.data;
              Swal.close();
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
        this.inventoryService.saveInventory(this.form.getRawValue()).subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.fire({
                icon: 'info',
                confirmButtonText: 'Ok',
                text: this.id === 0 ? 'Inventory successfully entered' : 'Inventory successfully updated',
              }).then((result) => {
                if (result.isConfirmed)
                  this.router.navigate(['/inventories']);
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
      if (result.isConfirmed) this.router.navigate(['/inventories']);
    });
  }

  compareWithBook(book: Book, book2: Book): boolean {
    return book && book2 && book.bookId === book2.bookId;
  }
}

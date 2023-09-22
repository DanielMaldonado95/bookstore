import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { Inventory } from 'src/app/interfaces/inventory';
import { InventoryService } from 'src/app/servicies/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
})
export class InventoriesComponent implements OnInit {

  title: string = 'Inventories';
  inventories: Inventory[] = [];
  items: any[] = [
    { title: 'Home', route: '/home' }
  ];

  constructor(
    private router: Router,
    private fileService: FileSaverService,
    private inventoryService: InventoryService) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.inventoryService.getInventories().subscribe({
          next: (resp) => {
            if (resp.data) {
              Swal.close();
              this.inventories = resp.data;
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
    this.router.navigate(['/inventory']);
  }

  edit(id: number): void {
    this.router.navigate(['/inventory', id]);
  }

  download(typeFile: number): void {
    Swal.fire({
      title: 'Loading the information',
      text: 'Please wait a moment...',
      didOpen: () => {
        Swal.showLoading();
        this.inventoryService.download(typeFile).subscribe({
          next: (resp) => {
            const file: any = new Blob([resp], { type: typeFile === 1 ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf' });
            this.fileService.save(file, `file_${formatDate(new Date(), 'dd-MM-yyyy hh:mm', 'en')}`);
            Swal.close();
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

}

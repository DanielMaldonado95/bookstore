import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../interfaces/inventory';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventories(): Observable<any> {
    return this.http.get(`${environment.api}/inventories`);
  }

  getInventory(id: number): Observable<any> {
    return this.http.get(`${environment.api}/inventory/${id}`);
  }

  saveInventory(inventory: Inventory): Observable<any> {
    return this.http.post(`${environment.api}/inventory`, inventory);
  }

  download(type: number): Observable<any> {
    return this.http.get(`${environment.api}/inventory-download/${type}`, { responseType: 'arraybuffer' as 'json' });
  }
}

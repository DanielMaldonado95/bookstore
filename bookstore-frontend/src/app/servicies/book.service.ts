import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${environment.api}/books`);
  }

  getBook(id: number): Observable<any> {
    return this.http.get(`${environment.api}/book/${id}`);
  }

  saveBook(book: Book): Observable<any> {
    return this.http.post(`${environment.api}/book`, book);
  }
}

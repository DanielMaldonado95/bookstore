import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get(`${environment.api}/authors`);
  }

  getAuthor(id: number): Observable<any> {
    return this.http.get(`${environment.api}/author/${id}`);
  }

  saveAuthor(author: Author): Observable<any> {
    return this.http.post(`${environment.api}/author`, author);
  }
}

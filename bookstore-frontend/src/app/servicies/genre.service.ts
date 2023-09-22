import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any> {
    return this.http.get(`${environment.api}/genres`);
  }

  getGenre(id: number): Observable<any> {
    return this.http.get(`${environment.api}/genre/${id}`);
  }

  saveGenre(genre: Genre): Observable<any> {
    return this.http.post(`${environment.api}/genre`, genre);
  }
}

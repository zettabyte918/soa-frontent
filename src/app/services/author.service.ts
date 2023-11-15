import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  DeleteAuthors(id: number): Observable<Author> {
    return this.http.delete<Author>(`${environment.api_url}/authors/${id}`);
  }

  UpdateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${environment.api_url}/authors/${author.id}`, author);
  }

  GetAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.api_url}/authors`);
  }

  GetAuthor(id: number | undefined): Observable<Author> {
    return this.http.get<Author>(`${environment.api_url}/authors/${id}`);
  }

  AddAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${environment.api_url}/authors`, author);
  }
}

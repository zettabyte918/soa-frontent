import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authors: any = [];

  constructor(private http: HttpClient) { }

  GetAuthors() {
    return this.http.get<Author[]>(`${environment.api_url}/authors`);
  }
}

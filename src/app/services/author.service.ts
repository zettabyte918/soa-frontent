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

  GetAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.api_url}/authors`);
  }
}

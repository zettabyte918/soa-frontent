import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  DeleteAuthors(id: number): Observable<Author> {
    const headers = this.authService.getHeaders();
    return this.http.delete<Author>(`${environment.api_url}/authors/${id}`, {
      headers,
    });
  }

  UpdateAuthor(author: Author): Observable<Author> {
    const headers = this.authService.getHeaders();

    return this.http.put<Author>(
      `${environment.api_url}/authors/${author.id}`,
      author
    );
  }

  GetAuthors(): Observable<Author[]> {
    const headers = this.authService.getHeaders();

    return this.http.get<Author[]>(`${environment.api_url}/authors`);
  }

  GetAuthor(id: number | undefined): Observable<Author> {
    const headers = this.authService.getHeaders();

    return this.http.get<Author>(`${environment.api_url}/authors/${id}`);
  }

  AddAuthor(author: Author): Observable<Author> {
    const headers = this.authService.getHeaders();

    return this.http.post<Author>(`${environment.api_url}/authors`, author);
  }

  uploadAvatar(userId: number, file: File) {
    const headers = this.authService.getHeaders();

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(
      `${environment.api_url}/authors/${userId}/upload-avatar`,
      formData
    );
  }

  deleteAvatar(id: number, avatar: String) {
    const headers = this.authService.getHeaders();

    return this.http.delete<any>(
      `${environment.api_url}/authors/${id}/delete-avatar?avatarUrl=${avatar}`
    );
  }
}

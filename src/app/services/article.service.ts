import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  DeleteArticle(id: number): Observable<Article> {
    const headers = this.authService.getHeaders();

    return this.http.delete<Article>(`${environment.api_url}/articles/${id}`, {
      headers,
    });
  }

  UpdateArticle(article: Article): Observable<Article> {
    const headers = this.authService.getHeaders();

    return this.http.put<Article>(
      `${environment.api_url}/articles/update/${article.id}`,
      article,
      {
        headers,
      }
    );
  }

  GetArticles(): Observable<Article[]> {
    const headers = this.authService.getHeaders();

    return this.http.get<Article[]>(`${environment.api_url}/articles`, {
      headers,
    });
  }

  AddArticle(article: Article): Observable<Article> {
    const headers = this.authService.getHeaders();

    return this.http.post<Article>(
      `${environment.api_url}/articles?authorId=${article.author.id}`,
      article,
      {
        headers,
      }
    );
  }
}

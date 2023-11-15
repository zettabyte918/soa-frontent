import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  DeleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`${environment.api_url}/articles/${id}`);
  }

  UpdateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${environment.api_url}/articles/update/${article.id}`, article);
  }

  GetArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.api_url}/articles`);
  }

  AddArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${environment.api_url}/articles?authorId=${article.author.id}`, article);
  }
}

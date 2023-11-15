import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articlesService: ArticleService) { }

  getAllArticles() {
    this.articlesService.GetArticles().subscribe((res: Article[]) => {
      this.articles = res
    })
  }

  ngOnInit(): void {
    this.getAllArticles()
  }

}

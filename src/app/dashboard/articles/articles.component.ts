import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Author } from 'src/app/models/Author';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  newArticle!: Article;

  // filter
  searchTerm: string = '';

  isEditing: boolean[] = [];
  authors: Author[] = [];
  isAdding: boolean = false;

  constructor(
    private articlesService: ArticleService,
    private authorsService: AuthorService,
    private toast: HotToastService,
    public authService: AuthService
  ) {
    this.newArticle = new Article();
    this.newArticle.author = new Author();

    this.articles.forEach((article: Author) => {
      this.isEditing[article.id || -1] = false;
    });
  }

  save() {
    this.articlesService
      .AddArticle(this.newArticle)
      .subscribe((res: Article) => {
        this.toast.success('Successfully added a new article!');
        this.isAdding = false;
        this.newArticle = new Article();
        this.newArticle.author = new Author();
        this.getAllArticles();
      });
  }

  deleteArticle(id: any) {
    const res = confirm('Are you sure you want to delete this article?');
    if (res) {
      this.articlesService.DeleteArticle(id).subscribe((res: Article) => {
        this.toast.success('Successfully deleted this article!');
        this.getAllArticles();
      });
    }
  }

  getAllArticles() {
    this.articlesService.GetArticles().subscribe((res: Article[]) => {
      this.articles = res;
    });
  }

  updateArticle(article: Article) {
    article.author.id = Number(article.author.id);
    this.articlesService.UpdateArticle(article).subscribe((res: Article) => {
      this.toast.success('Article updated successfully!');
      this.getAllArticles();
    });

    this.isEditing[article.id || -1] = false;
  }

  startEditing(index: any): void {
    // Set isEditing to true for the specified index
    this.isEditing[index] = true;
  }

  ngOnInit(): void {
    this.getAllArticles();
    this.authorsService.GetAuthors().subscribe((res: Author[]) => {
      this.authors = res;
    });
  }
}

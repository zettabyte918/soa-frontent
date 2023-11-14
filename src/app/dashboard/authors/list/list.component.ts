import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  authors: Author[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.GetAuthors().subscribe((res: Author[]) => {
      console.log(res);
      this.authors = res
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isAdding: boolean = false;
  authors: Author[] = [];

  newAuthor!: Author;
  isEditing: boolean[] = [];
  showPassword: boolean[] = [];
  isEdititngState: boolean = false;

  constructor(private authorService: AuthorService) {
    this.newAuthor = new Author();

    this.authors.forEach((author: Author) => {
      this.isEditing[author.id || -1] = false;
    });
  }

  showAuthorPassword(author: Author) {
    const element = document.getElementById(author.id + "-pass");
    if (element !== null) {
      element.innerText = author.password || "";
      this.showPassword[author.id || -1] = true;
    }
  }

  hideAuthorPassword(author: Author) {
    const element = document.getElementById(author.id + "-pass");
    if (element !== null) {
      element.innerText = "*******";
      this.showPassword[author.id || -1] = false;
    }
  }


  addAuthor() {
    this.newAuthor.username = `${this.newAuthor.firstname}${this.newAuthor.lastname}${this.newAuthor.tel}`

    this.authorService.AddAuthor(this.newAuthor).subscribe((res: Author) => {
      this.isAdding = false;
      this.newAuthor = new Author();
      this.getAllAuthors();
    })
  }

  deleteAuthor(id: any) {
    const res = confirm("Are you sure yo want to delete this author ?")
    if (res) {
      this.authorService.DeleteAuthors(id).subscribe((res: Author) => {
        alert("success");
        this.getAllAuthors();
      })
    }
  }


  getAllAuthors() {
    this.authorService.GetAuthors().subscribe((res: Author[]) => {
      this.authors = res
      this.updateDateFormats();
    })
  }

  updateDateFormats() {
    this.authors.forEach((author: any) => {
      // Assuming datenai is a string in the format "2023-11-08T00:00:00.000+00:00"
      // You can use a library like moment.js for more advanced date formatting
      const date = new Date(author.datenai);
      const formattedDate = date.toISOString().split('T')[0]; // Format as "2023-11-15"
      author.datenai = formattedDate;
    });
  }

  startEditing(index: any): void {
    // Set isEditing to true for the specified index
    this.isEditing[index] = true;
    this.isEdititngState = true;
  }

  save(author: Author): void {
    // Set isEditing to true for the specified index
    this.isEditing[author.id || -1] = false;
    this.isEdititngState = false;

    // update current author
    this.authorService.UpdateAuthor(author).subscribe((res: any) => {
      alert("update success")
    });
  }



  ngOnInit(): void {
    this.getAllAuthors();
  }

}

import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, of } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isAdding: boolean = false;
  authors: Author[] = [];

  // filter author
  searchTerm: string = '';
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;

  newAuthor!: Author;
  isEditing: boolean[] = [];
  showPassword: boolean[] = [];
  isEdititngState: boolean = false;

  constructor(
    private authorService: AuthorService,
    private toast: HotToastService
  ) {
    this.newAuthor = new Author();

    this.authors.forEach((author: Author) => {
      this.isEditing[author.id || -1] = false;
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };

      reader.readAsDataURL(fileInput.files[0]);

      // If you need to store the selected file, you can assign it to this.selectedFile
      this.selectedFile = fileInput.files[0] as File;
    }
  }

  showAuthorPassword(author: Author) {
    const element = document.getElementById(author.id + '-pass');
    if (element !== null) {
      element.innerText = author.password || '';
      this.showPassword[author.id || -1] = true;
    }
  }

  hideAuthorPassword(author: Author) {
    const element = document.getElementById(author.id + '-pass');
    if (element !== null) {
      element.innerText = '*******';
      this.showPassword[author.id || -1] = false;
    }
  }

  addAuthor() {
    this.newAuthor.username = `${this.newAuthor.firstname}${this.newAuthor.lastname}${this.newAuthor.tel}`;

    this.authorService.AddAuthor(this.newAuthor).subscribe((res: Author) => {
      this.isAdding = false;
      this.newAuthor = new Author();
      this.authorService
        .uploadAvatar(res.id as number, this.selectedFile as File)
        .pipe(
          this.toast.observe({
            loading: 'Detecting faces...',
            success: (s) => s.message,
            error: (e) => e.error.message,
          }),
          catchError((error) => of(error))
        )
        .subscribe((res: any) => {
          // update authors list after uplaod the avatar
          this.getAllAuthors();
        });
      this.toast.success('Successfully added a new author!');
    });
  }

  deleteAuthor(id: any) {
    const res = confirm('Are you sure yo want to delete this author ?');
    if (res) {
      this.authorService.DeleteAuthors(id).subscribe((res: Author) => {
        this.toast.success('Success this author has been deleted!');
        this.getAllAuthors();
      });
    }
  }

  getAllAuthors() {
    this.authorService.GetAuthors().subscribe((res: Author[]) => {
      this.authors = res;
      this.updateDateFormats();
    });
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
    this.authorService.UpdateAuthor(author).subscribe((res: Author) => {
      this.toast.success('Successfully updated this author!');
    });
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }
}

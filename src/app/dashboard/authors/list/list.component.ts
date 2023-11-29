import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, of } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('AnimationTrigger0', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('AnimationTrigger1', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1rem)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(1rem)' })
        ),
      ]),
    ]),
  ],
})
export class ListComponent implements OnInit {
  isModal: Boolean = false;
  isAdding: boolean = false;
  currentAuthor: Author = new Author();
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
    public authService: AuthService,
    private toast: HotToastService
  ) {
    this.newAuthor = new Author();

    this.authors.forEach((author: Author) => {
      this.isEditing[author.id || -1] = false;
    });
  }

  closeImagesModal() {
    this.isModal = false;
    this.currentAuthor = new Author();
  }

  deleteAvatar(avatar: String) {
    this.authorService
      .deleteAvatar(this.currentAuthor.id || -1, avatar)
      .subscribe((res: any) => {
        this.authorService
          .GetAuthor(this.currentAuthor.id)
          .subscribe((author: Author) => {
            this.currentAuthor.avatarUrls = author.avatarUrls;
            this.getAllAuthors();
            console.log('delete image: ' + this.currentAuthor);
          });
      });
  }

  openImagesModal(id: number) {
    this.authorService.GetAuthor(id).subscribe((author: Author) => {
      this.isModal = true;
      this.currentAuthor = author;
      this.currentAuthor.id = id;
      console.log(this.currentAuthor);
    });
  }

  uploadImage() {
    this.authorService
      .uploadAvatar(this.currentAuthor.id as number, this.selectedFile as File)
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
        this.authorService
          .GetAuthor(this.currentAuthor.id)
          .subscribe((author: Author) => {
            this.isModal = true;
            this.currentAuthor.avatarUrls = author.avatarUrls;
            console.log(this.currentAuthor);
          });
        this.selectedImage = null;
        this.selectedFile = null;
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
      this.getAllAuthors();
      this.selectedFile = null;
      this.selectedImage = null;
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

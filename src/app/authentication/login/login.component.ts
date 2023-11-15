import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = "";
  email: string = ""

  constructor(private router: Router, private toast: HotToastService) { }

  login() {
    if (this.email == "hossem.cold@gmail.com" && this.password == "123456") {
      this.router.navigate(['/dashboard/authors']);
      this.toast.success("Login success");
    } else {
      this.toast.error("Error login this user!");
    }
  }

  ngOnInit(): void {
  }

}

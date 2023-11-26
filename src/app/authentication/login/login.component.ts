import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ""
  password: string = "";

  constructor(private router: Router, private authService: AuthService, private toast: HotToastService) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe((res: any) => {
      const token = res.headers.get('Authorization');
      this.authService.setToken(token);
      this.toast.success("Login successfully");
      this.router.navigate(['/dashboard/authors']);
    });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  isMenuProfile: boolean = false;
  isMenuSideBar: boolean = false;

  logout() {
    this.authService.roles = [];
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();
  roles: String[] = [];
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post(`${environment.api_login_url}/users/login`, body, {
      observe: 'response',
    });
  }

  decodeJWT() {
    const decodedToken = this.helper.decodeToken(this.getToken() || '');
    this.roles = decodedToken.roles;
  }

  hasRole(role: String) {
    return this.roles.includes(role);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.decodeJWT();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

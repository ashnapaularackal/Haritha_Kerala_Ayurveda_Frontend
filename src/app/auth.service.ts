import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api';  // Adjust the base URL as needed

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ message: string, token: string, refreshToken: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          const token = response.token;
          const refreshToken = response.refreshToken;
          if (token && refreshToken) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
          }
        })
      );
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password, email }, { responseType: 'text' });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { email });
  }

  updatePassword(resetToken: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-password`, { resetToken, newPassword });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  refreshToken(): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/refresh-token`, { refreshToken: this.getRefreshToken() })
      .pipe(
        tap(response => {
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

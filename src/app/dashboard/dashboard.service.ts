import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dashboard } from './dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api'; // Replace with your backend API base URL

  constructor(private http: HttpClient) { }

  getAllRegistrations(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.baseUrl}/registrations`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration, TimeSlot } from './registration-admin';
import {HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api'; // Base URL

  constructor(private http: HttpClient) { }


register(registerModel: Registration): Observable<Registration> {
  return this.http.post<Registration>(`${this.apiUrl}/registration/register`, registerModel)
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}


getTreatments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/packages`);
}
private apiUr = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api/email/send';



sendEmail(userEmail: string, adminEmail: string, subject: string, text: string): Observable<any> {
  const emailData = {
    userEmail,
    adminEmail,
    subject,
    text
  };
  //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

  return this.http.post(this.apiUr, emailData);
}


}
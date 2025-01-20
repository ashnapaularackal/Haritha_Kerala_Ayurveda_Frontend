import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billing} from './billing';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BillingService {


  constructor(private http:HttpClient)
   { }

   reg:Billing[] |any;

   private baseUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api';

   billing(registermodel:Billing):Observable<Billing>
   {
     console.log(registermodel);
     //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
     return this.http.post<Billing>(`http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api/registration/register`, registermodel);
    
      
   }
   private apiUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api/email/send';
 
   sendEmail(userEmail: string, adminEmail: string, subject: string, text: string): Observable<any> {
     const emailData = {
       userEmail,
       adminEmail,
       subject,
       text
     };
     //const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

     return this.http.post(this.apiUrl, emailData);
   }
   
}

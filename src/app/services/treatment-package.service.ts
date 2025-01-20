import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TreatmentPackage } from './treatment-package.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentPackageService {
  private apiUrl = 'http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api/packages';

  constructor(private http: HttpClient) {}

  getAllPackages(): Observable<TreatmentPackage[]> {
    return this.http.get<TreatmentPackage[]>(this.apiUrl);
  }

  getPackageById(id: number): Observable<TreatmentPackage> {
    return this.http.get<TreatmentPackage>(`${this.apiUrl}/${id}`);
  }

  savePackage(treatmentPackage: TreatmentPackage): Observable<TreatmentPackage> {
    return this.http.post<TreatmentPackage>(this.apiUrl, treatmentPackage);
  }

  updatePackage(id: number, treatmentPackage: TreatmentPackage): Observable<TreatmentPackage> {
    return this.http.put<TreatmentPackage>(`${this.apiUrl}/${id}`, treatmentPackage);
  }
  deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


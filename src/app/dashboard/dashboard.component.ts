import { Component, OnInit } from '@angular/core';
import { Dashboard } from './dashboard';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    registrations: any[] = [];
    filteredRegistrations: any[] = [];
    filterText: string = '';
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc'; 
  
    constructor(private http: HttpClient, private router: Router) { }
  
    ngOnInit(): void {
      this.fetchRegistrations();
    }
  
    fetchRegistrations() {
      this.http.get<any[]>('http://haritha-env.eba-7rmsjpre.us-east-1.elasticbeanstalk.com/api/registrations').subscribe(
        (data) => {
          this.registrations = data;
          this.filteredRegistrations = data;
        },
        (error) => {
          console.error('Error fetching registrations:', error);
        }
      );
    }
  
    applyFilter() {
      this.filteredRegistrations = this.registrations.filter(reg =>
        Object.values(reg).some(value =>
          value && value.toString().toLowerCase().includes(this.filterText.toLowerCase())
        )
      );
      if (this.sortColumn) {
        this.sortData(this.sortColumn, this.sortDirection);
      }
    }
  
    sortData(column: string, direction: 'asc' | 'desc') {
      this.sortColumn = column;
      this.sortDirection = direction;
      this.filteredRegistrations.sort((a, b) => {
        const aValue = this.getValue(a, column);
        const bValue = this.getValue(b, column);
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
  
    getValue(obj: any, path: string): any {
      return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : '', obj);
    }
  
    downloadDetails() {
      const headers = [
        "User Code", "User Name", "Email", "Contact Number", "Age", "Date", "Gender",
        "Nationality", "Country of Residence", "City", "Visited", "Allergy",
        "WhatsApp Number", "Contact WhatsApp", "Treatment", "Time Slot"
      ];
  
      const csvData = this.filteredRegistrations.map(reg => [
        reg.userCode,
        reg.usersName,
        reg.email,
        reg.contact_number,
        reg.age,
        this.formatDate(reg.date),
        reg.gender,
        reg.nationality,
        reg.country_of_residence,
        reg.city,
        reg.visited,
        reg.allergy,
        reg.whatsupnumber,
        reg.contactwhatsup,
        reg.treatment?.name,
        `${reg.timeSlot?.startTime} - ${reg.timeSlot?.endTime}`
      ]);
  
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += headers.join(",") + "\n";
      csvContent += csvData.map(e => e.join(",")).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "registration_details.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    }
  
    viewPackages() {
      // Navigate to packages page
      this.router.navigate(['/list']);
    }
  
    newBooking() {
      // Navigate to new booking page
      this.router.navigate(['/booking']);
    }
  }
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { BillingService } from './billing.service';
import { SharedService } from '../registration-admin/shared. service';
import { Billing } from './billing';
import { TimeSlot } from '../registration-admin/registration-admin';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  selectedPaymentOption: string = 'payLater';
  @ViewChild(MatSort) sort: MatSort | any;
  public myForm: FormGroup | any;
  displayedColumns: string[] = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];

  constructor(
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private comp: BillingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
  }

  data: {} | any;
  billingModel: Billing = new Billing();
  billingarr: Array<Billing> = [];

  submitBilling() {
    this.comp.billing(this.billingModel).subscribe(
      (data) => {
        // Swal.fire('Thank you...', 'Booking Confirmed!', 'success');
        this.data = JSON.stringify(data);
        this.billingarr.push(this.data);
        this.router.navigate(['/home']);

        const userEmail = this.sharedService.getUserEmail();
        const userName = this.sharedService.getUserName();
        const selectedPackage = this.sharedService.getSelectedPackage();
        const age = this.sharedService.getAge();
        const contactNumber = this.sharedService.getContactNumber();
        const gender = this.sharedService.getGender();
        const nationality = this.sharedService.getNationality();
        const countryOfResidence = this.sharedService.getCountryOfResidence();
        const city = this.sharedService.getCity();
        const visited = this.sharedService.getVisited();
        const allergy = this.sharedService.getAllergy();
        const whatsupnumber = this.sharedService.getWhatsupNumber();
        const contactwhatsup = this.sharedService.getContactWhatsup();
        const appointmentDate = this.sharedService.getDate() ?
        this.datePipe.transform(this.sharedService.getDate(), 'yyyy-MM-dd') : 'Not specified';

        const timeSlot: TimeSlot | null = this.sharedService.getTimeSlot();
        const appointmentTime = timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : 'Not specified';

          
        const adminEmail = 'ashnapaularackal@gmail.com';
        const subject = 'Booking Confirmation';
        const text = `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: green;">Haritha Kerala Ayurveda and Yoga Centre</h1>
            <p>Dear ${userName},</p>
            <p>Your booking has been confirmed. Here are the details of your registration:</p>
           <ul>
            <li>Email: ${userEmail}</li>
            <li>Selected Package: ${selectedPackage ? selectedPackage : 'Not specified'}</li>
            <li>Age: ${age}</li>
            <li>Contact Number: ${contactNumber}</li>
            <li>Gender: ${gender}</li>
            <li>Nationality: ${nationality}</li>
            <li>Country of Residence: ${countryOfResidence}</li>
            <li>City: ${city}</li>
            <li>Visited Before: ${visited}</li>
            <li>Allergies: ${allergy}</li>
            <li>WhatsApp Number: ${whatsupnumber}</li>
            <li>Contact via WhatsApp: ${contactwhatsup}</li>
            <li>Preferred Appointment Date: ${appointmentDate}</li>
            <li>Preferred Appointment Time: ${appointmentTime}</li>
            <li>Payment Option: ${this.selectedPaymentOption}</li>
          </ul>
            </ul>
            <p>We look forward to serving you.</p>
            <p>Best Regards,</p>
            <p>Haritha Kerala Ayurveda and Yoga Centre Team</p>
          </div>
        `;

        this.comp.sendEmail(userEmail, adminEmail, subject, text).subscribe(
          (response) => {
            console.log('Emails sent successfully', response);
          },
          (error) => {
            console.error('Error sending emails', error);
          }
        );
      },
      (error) => {
        // Swal.fire('Sorry...', 'Fill mandatory Fields!', 'error');
        console.log(error);
      }
    );
  }
}


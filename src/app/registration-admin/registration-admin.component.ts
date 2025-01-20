import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration, TimeSlot, TreatmentPackage } from './registration-admin';
import { RegistrationService } from './registration-admin.service';
// import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-admin',
  templateUrl: './registration-admin.component.html',
  styleUrls: ['./registration-admin.component.css']
})
export class RegistrationAdminComponent implements OnInit {
  registrationForm: FormGroup;
  treatments: TreatmentPackage[] = [];
  timeSlots: TimeSlot[] = [];
  errorMessage: string = '';

  // Define the missing properties
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  contactWhatsAppOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      usersName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', Validators.required],
      age: [''],
      date: ['', Validators.required],
      gender: [''],
      nationality: [''],
      country_of_residence: [''],
      city: [''],
      visited: [''],
      allergy: [''],
      whatsupnumber: [''],
      contactwhatsup: [''],
      treatment: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registrationService.getTreatments().subscribe((data) => {
      this.treatments = data;
    });
  }

  onTreatmentChange(treatmentId: string) {
    const id = Number(treatmentId);
    const selectedTreatment = this.treatments.find(t => t.id === id);
    this.timeSlots = selectedTreatment ? selectedTreatment.timeSlots : [];
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const treatmentControl = this.registrationForm.get('treatment');
      const timeSlotControl = this.registrationForm.get('timeSlot');
      
      if (treatmentControl && timeSlotControl) {
        formData.treatmentId = treatmentControl.value;
        formData.timeSlotId = timeSlotControl.value;
      }
      
      this.registrationService.register(formData).subscribe(
        response => {
          console.log('Registration successful', response);
          this.sendConfirmationEmail(formData);
          // Swal.fire('Thank you...', 'You Booked successfully! Please check your email', 'success');
          this.router.navigate(['/dashboard']);
          this.errorMessage = '';
          this.registrationForm.reset();
        },
        error => {
          // Swal.fire('Sorry...', 'Fill mandatory fields!', 'error');
          console.log(error);
          this.errorMessage = error.error.message || 'An error occurred. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  sendConfirmationEmail(formData: any) {
    const selectedTreatment = this.treatments.find(t => t.id === formData.treatmentId);
    const selectedTimeSlot = this.timeSlots.find(t => t.id === formData.timeSlotId);
    const formattedDate = format(new Date(formData.date), 'MMMM d, yyyy');
    const userEmail = formData.email;
    const adminEmail = 'ashnapaularackal@gmail.com';
    const subject = 'Booking Confirmation';
    const text = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: green;">Haritha Kerala Ayurveda and Yoga Centre</h1>
          <p>Dear ${formData.usersName},</p>
          <p>Your booking has been confirmed. Here are the details of your registration:</p>
          <ul>
            <li>Email: ${formData.email}</li>
            <li>Selected Package: ${selectedTreatment ? selectedTreatment.name : 'Not specified'}</li>
            <li>Age: ${formData.age}</li>
            <li>Contact Number: ${formData.contact_number}</li>
            <li>Gender: ${formData.gender}</li>
            <li>Nationality: ${formData.nationality}</li>
            <li>Country of Residence: ${formData.country_of_residence}</li>
            <li>City: ${formData.city}</li>
            <li>Visited Before: ${formData.visited}</li>
            <li>Allergies: ${formData.allergy}</li>
            <li>WhatsApp Number: ${formData.whatsupnumber}</li>
            <li>Contact via WhatsApp: ${formData.contactwhatsup}</li>
            <li>Preferred Appointment Date: ${formattedDate}</li>
            <li>Preferred Appointment Time: ${selectedTimeSlot ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}` : 'Not specified'}</li>
          </ul>
          <p>We look forward to serving you.</p>
          <p>Best Regards,</p>
          <p>Haritha Kerala Ayurveda and Yoga Centre Team</p>
        </div>
      `

    this.registrationService.sendEmail(userEmail, adminEmail, subject, text).subscribe(
      (response) => {
        console.log('Emails sent successfully', response);
      },
      (error) => {
        console.error('Error sending emails', error);
      }
    );
  }
  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}

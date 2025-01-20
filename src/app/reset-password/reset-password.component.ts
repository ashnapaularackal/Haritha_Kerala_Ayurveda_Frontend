import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    resetForm: FormGroup;
    message: string = ''; // Initialize the message property
  
    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
      this.resetForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }
  
    onSubmit() {
      if (this.resetForm.valid) {
        this.authService.resetPassword(this.resetForm.value.email).subscribe(
          response => {
            this.message = 'Password reset token sent to your email';
            this.router.navigate(['/update-password']); // Navigate to the update password page
          },
          error => this.router.navigate(['/update-password'])
        );
      }
    }
}

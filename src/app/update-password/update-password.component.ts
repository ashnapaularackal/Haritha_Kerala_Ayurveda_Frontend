import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { update } from './update';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  updateForm: FormGroup;
  message: string = ''; // Initialize the message property
  updatemodel: update= new update();
  updatearr: update[] = []; // Use Registration type array
  data: {} |any;
  constructor(private authService: AuthService, private fb: FormBuilder ,private router: Router) {
    this.updateForm = this.fb.group({
      resetToken: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.authService.updatePassword(this.updateForm.value.resetToken, this.updateForm.value.newPassword).subscribe(
        error => this.message = 'Password updated successfully',
        error => this.router.navigate(['/login'])
      );
    }
  }
  
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.register(this.username, this.password, this.email).subscribe(
      response => {
        this.message = response;
      },
      error => {
        this.message = 'Registration failed';
      }
    );
  }
}

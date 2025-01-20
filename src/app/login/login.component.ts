import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Assuming AuthService sets tokens in localStorage
        this.message = 'Login successful!';
        if (this.username === 'admin' && this.password === 'admin') {
          this.router.navigateByUrl('/dashboard');
        }
        else
        {
        this.router.navigate(['/home']);
        } // Navigate to the booking page or desired route
      },
      error => {
        console.error('Login error:', error);
        this.message = 'Invalid username or password';
      }
    );
  }
}

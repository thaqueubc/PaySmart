import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  protected readonly submitted = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly formMessage = signal('');
  protected credentials = { username: '', password: '', remember: false };

  private readonly authenticationService = inject(AuthenticationService);

  protected onSubmit(form: NgForm): void {
    this.formMessage.set('');
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // Match the API model's property name when creating the request body.
    const request: LoginRequest = {
      userName: this.credentials.username,
      password: this.credentials.password,
    };

    // Subscribe to start the HTTP request and handle its asynchronous result.
    this.authenticationService.login(request).subscribe({
      next: (response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          this.submitted.set(true);
          this.formMessage.set(response.message || 'Login successful.');
          return;
        }

        this.formMessage.set(response.message || 'Unable to log in. Check your details and try again.');
      },
      error: (error: { error?: { message?: string }; message?: string }) => {
        this.formMessage.set(
          error.error?.message || error.message || 'Unable to reach the login service. Please try again.',
        );
      },
    });
  }

  protected showHelp(event: Event): void {
    event.preventDefault();
    this.formMessage.set(
      'Password reset is not available yet. Please contact support for help.',
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // Keep the API URL in one place so it is easy to replace with an environment setting later.
  private readonly loginUrl = 'https://localhost:7213/api/login';
  private readonly http = inject(HttpClient);

  /** Sends the supplied credentials to the API and emits its typed response. */
  login(request: LoginRequest): Observable<LoginResponse> {
    // HttpClient serializes this object as JSON and returns an Observable for the response.
    return this.http.post<LoginResponse>(this.loginUrl, request);
  }
}

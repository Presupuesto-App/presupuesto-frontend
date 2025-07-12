import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, tap } from 'rxjs';
import { LoginDto, LoginResponse } from '../../shared/models/login.dto';
import { RegisterDto } from '../../shared/models/register.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  login(credentials: LoginDto): Observable<LoginResponse> {
    return this.apiService.post<LoginDto, LoginResponse>('/auth/login', credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.tokenService.saveToken(response.token);
          }
        })
      );
  }

  register(user: RegisterDto): Observable<any> {
    return this.apiService.post<RegisterDto, any>('/auth/register', user);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }
}

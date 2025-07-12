import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth/auth.service';
import { LoginDto } from '../../shared/models/login.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isLoading = true;
    const credentials: LoginDto = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('¡Inicio de sesión exitoso!', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/preguntas']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.error?.message || 'Error al iniciar sesión', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error de login:', error);
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}

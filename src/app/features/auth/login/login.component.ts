import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Connexion</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email" 
              placeholder="Entrez votre email"
              [ngClass]="{'is-invalid': loginForm.get('email')?.invalid && loginForm.get('email')?.touched}"
              required>
            <div class="invalid-feedback" *ngIf="loginForm.get('email')?.errors?.['required']">
              L'email est requis
            </div>
            <div class="invalid-feedback" *ngIf="loginForm.get('email')?.errors?.['email']">
              Veuillez entrer un email valide
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="Entrez votre mot de passe"
              [ngClass]="{'is-invalid': loginForm.get('password')?.invalid && loginForm.get('password')?.touched}"
              required>
            <div class="invalid-feedback" *ngIf="loginForm.get('password')?.errors?.['required']">
              Le mot de passe est requis
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="loading" class="btn btn-primary">
              <span *ngIf="!loading">Se connecter</span>
              <span *ngIf="loading">Connexion en cours...</span>
            </button>
          </div>

          <div class="auth-links">
            <a routerLink="/auth/register">Créer un compte</a>
            <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f3f2ef;
      padding: 20px;
    }
    
    .auth-card {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #0a66c2;
    }
    
    .form-group {
      margin-bottom: 16px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .is-invalid {
      border-color: #d11124;
    }
    
    .invalid-feedback {
      color: #d11124;
      font-size: 14px;
      margin-top: 4px;
    }
    
    .btn {
      display: inline-block;
      padding: 10px 24px;
      border: none;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      width: 100%;
    }
    
    .btn-primary {
      background-color: #0a66c2;
      color: white;
    }
    
    .btn-primary:disabled {
      background-color: #a0c4e7;
      cursor: not-allowed;
    }
    
    .auth-links {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    
    a {
      color: #0a66c2;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .form-actions {
      margin-top: 24px;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loading = false;
  error: string | null = null;
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email!, password!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        }
      });
  }
}

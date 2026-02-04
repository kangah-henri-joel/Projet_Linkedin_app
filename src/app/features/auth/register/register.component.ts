import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Créer un compte</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input 
              id="firstName" 
              type="text" 
              formControlName="firstName" 
              placeholder="Entrez votre prénom"
              [ngClass]="{'is-invalid': registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched}"
              required>
            <div class="invalid-feedback" *ngIf="registerForm.get('firstName')?.errors?.['required']">
              Le prénom est requis
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input 
              id="lastName" 
              type="text" 
              formControlName="lastName" 
              placeholder="Entrez votre nom"
              [ngClass]="{'is-invalid': registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched}"
              required>
            <div class="invalid-feedback" *ngIf="registerForm.get('lastName')?.errors?.['required']">
              Le nom est requis
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email" 
              placeholder="Entrez votre email"
              [ngClass]="{'is-invalid': registerForm.get('email')?.invalid && registerForm.get('email')?.touched}"
              required>
            <div class="invalid-feedback" *ngIf="registerForm.get('email')?.errors?.['required']">
              L'email est requis
            </div>
            <div class="invalid-feedback" *ngIf="registerForm.get('email')?.errors?.['email']">
              Veuillez entrer un email valide
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="Créez un mot de passe"
              [ngClass]="{'is-invalid': registerForm.get('password')?.invalid && registerForm.get('password')?.touched}"
              [type]="showPassword ? 'text' : 'password'"
              required>
            <button type="button" class="toggle-password" (click)="togglePasswordVisibility()">
              {{ showPassword ? 'Masquer' : 'Afficher' }}
            </button>
            <div class="invalid-feedback" *ngIf="registerForm.get('password')?.errors?.['required']">
              Le mot de passe est requis
            </div>
            <div class="invalid-feedback" *ngIf="registerForm.get('password')?.errors?.['minlength']">
              Le mot de passe doit contenir au moins 6 caractères
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input 
              id="confirmPassword" 
              type="password" 
              formControlName="confirmPassword" 
              placeholder="Confirmez votre mot de passe"
              [ngClass]="{'is-invalid': (registerForm.get('confirmPassword')?.invalid || registerForm.hasError('passwordMismatch')) && registerForm.get('confirmPassword')?.touched}"
              [type]="showConfirmPassword ? 'text' : 'password'"
              required>
            <button type="button" class="toggle-password" (click)="toggleConfirmPasswordVisibility()">
              {{ showConfirmPassword ? 'Masquer' : 'Afficher' }}
            </button>
            <div class="invalid-feedback" *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
              Veuillez confirmer votre mot de passe
            </div>
            <div class="invalid-feedback" *ngIf="registerForm.hasError('passwordMismatch')">
              Les mots de passe ne correspondent pas
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="loading || registerForm.invalid" class="btn btn-primary">
              <span *ngIf="!loading">S'inscrire</span>
              <span *ngIf="loading">Inscription en cours...</span>
            </button>
          </div>

          <div class="auth-links">
            <span>Vous avez déjà un compte ?</span>
            <a routerLink="/auth/login">Se connecter</a>
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
      max-width: 450px;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #0a66c2;
    }
    
    .form-group {
      margin-bottom: 16px;
      position: relative;
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
      box-sizing: border-box;
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
      padding: 12px 24px;
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
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
    
    a {
      color: #0a66c2;
      text-decoration: none;
      font-weight: 600;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .form-actions {
      margin: 24px 0;
    }
    
    .toggle-password {
      position: absolute;
      right: 10px;
      top: 35px;
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 14px;
    }
    
    .password-strength {
      margin-top: 4px;
      height: 4px;
      background-color: #eee;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .strength-bar {
      height: 100%;
      width: 0%;
      transition: width 0.3s ease, background-color 0.3s ease;
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loading = false;
  error: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    const { confirmPassword, ...userData } = this.registerForm.value;
    
    this.authService.register(userData)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Bienvenue sur LinkedIn Clone</h1>
      <p>Votre réseau professionnel en ligne</p>
      <nav>
        <a routerLink="/feed" class="btn btn-primary">Voir le fil d'actualité</a>
        <a routerLink="/profile" class="btn btn-secondary">Mon profil</a>
      </nav>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      color: #0a66c2;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }
    nav {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background-color: #0a66c2;
      color: white;
      border: 1px solid #0a66c2;
    }
    .btn-secondary {
      background-color: white;
      color: #0a66c2;
      border: 1px solid #0a66c2;
    }
    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  `]
})
export class HomeComponent {}

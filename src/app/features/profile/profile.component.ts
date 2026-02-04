import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Mon Profil</h2>
      <p>Gérez votre profil professionnel</p>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
    }
  `]
})
export class ProfileComponent {}

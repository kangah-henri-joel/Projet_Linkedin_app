import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feed-container">
      <h2>Fil d'actualité</h2>
      <p>Votre fil d'actualité s'affichera ici.</p>
    </div>
  `,
  styles: [`
    .feed-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
      margin-bottom: 1rem;
    }
  `]
})
export class FeedComponent {}

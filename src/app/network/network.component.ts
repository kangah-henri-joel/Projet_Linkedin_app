import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NetworkService, Profile, Invitation } from '../services/network.service';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { InvitationComponent } from './invitation/invitation.component';
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileCardComponent, InvitationComponent, RouterLink],
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  peopleProfiles$!: Observable<Profile[]>;
  schoolProfiles$!: Observable<Profile[]>;
  companyProfiles$!: Observable<Profile[]>;
  invitations$!: Observable<Invitation[]>;
  
  searchQuery = '';
  activeTab = 'people';
  invitationsCount = 0;
  
  // Pour suivre l'état des connexions en temps réel
  connectedProfiles: Set<string> = new Set();
  loadingProfiles: Set<string> = new Set();

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    this.loadProfiles();
    this.loadInvitations();
  }

  loadProfiles(): void {
    this.peopleProfiles$ = this.networkService.getProfiles();
    this.schoolProfiles$ = this.networkService.getProfiles();
    this.companyProfiles$ = this.networkService.getProfiles();
  }

  loadInvitations(): void {
    this.invitations$ = this.networkService.getInvitations();
    this.invitations$.subscribe(invitations => {
      this.invitationsCount = invitations.length;
    });
  }

  onSearchChange(): void {
    // Implémentation de la recherche en temps réel
    if (this.searchQuery.trim()) {
      this.peopleProfiles$ = this.networkService.searchProfiles(this.searchQuery);
      this.schoolProfiles$ = this.networkService.searchProfiles(this.searchQuery);
      this.companyProfiles$ = this.networkService.searchProfiles(this.searchQuery);
    } else {
      this.loadProfiles();
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  acceptInvitation(invitationId: string): void {
    this.networkService.acceptInvitation(invitationId).subscribe({
      next: (success) => {
        if (success) {
          this.showNotification('Invitation acceptée avec succès !', 'success');
          this.loadInvitations();
          this.loadProfiles();
        }
      },
      error: () => {
        this.showNotification('Erreur lors de l\'acceptation de l\'invitation', 'error');
      }
    });
  }

  ignoreInvitation(invitationId: string): void {
    this.networkService.ignoreInvitation(invitationId).subscribe({
      next: (success) => {
        if (success) {
          this.showNotification('Invitation ignorée', 'info');
          this.loadInvitations();
        }
      },
      error: () => {
        this.showNotification('Erreur lors de l\'ignorance de l\'invitation', 'error');
      }
    });
  }

  connectWithProfile(profileId: string): void {
    if (this.loadingProfiles.has(profileId)) return;
    
    this.loadingProfiles.add(profileId);
    this.showNotification('Connexion en cours...', 'info');
    
    this.networkService.connectToProfile(profileId).subscribe({
      next: (success) => {
        if (success) {
          this.connectedProfiles.add(profileId);
          this.loadingProfiles.delete(profileId);
          this.showNotification('Connexion établie avec succès !', 'success');
          this.loadProfiles();
        } else {
          this.loadingProfiles.delete(profileId);
          this.showNotification('Impossible de se connecter à ce profil', 'error');
        }
      },
      error: () => {
        this.loadingProfiles.delete(profileId);
        this.showNotification('Erreur lors de la connexion', 'error');
      }
    });
  }

  sendMessageToProfile(profileId: string): void {
    // Navigation vers la messagerie avec le profil sélectionné
    this.showNotification('Redirection vers la messagerie...', 'info');
    
    // Simuler une navigation vers la messagerie
    setTimeout(() => {
      this.showNotification('Messagerie ouverte - Prêt à envoyer un message', 'success');
    }, 1000);
  }

  viewProfile(profileId: string): void {
    // Navigation vers la page de profil
    this.showNotification('Chargement du profil...', 'info');
    
    // Simuler l'ouverture du profil LinkedIn
    setTimeout(() => {
      this.showNotification('Profil LinkedIn ouvert dans un nouvel onglet', 'success');
    }, 800);
  }

  ignoreSuggestion(profileId: string): void {
    // Masquer la suggestion
    this.showNotification('Suggestion masquée', 'info');
    
    // Simuler la suppression de la suggestion avec une approche sécurisée
    const suggestionElement = document.querySelector(`[onclick="ignoreSuggestion('${profileId}')"]`)?.closest('.suggestion-item') as HTMLElement;
    if (suggestionElement) {
      suggestionElement.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        suggestionElement.remove();
      }, 300);
    }
  }

  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.linkedin-notification');
    existingNotifications.forEach(n => n.remove());
    
    // Créer une notification moderne style LinkedIn
    const notification = document.createElement('div');
    notification.className = 'linkedin-notification';
    notification.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      z-index: 9999;
      min-width: 320px;
      max-width: 400px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-left: 4px solid ${type === 'success' ? '#0a66c2' : type === 'error' ? '#e74c3c' : '#f39c12'};
      animation: slideInRight 0.3s ease-out;
    `;
    
    const icon = type === 'success' ? 'check-circle-fill' : type === 'error' ? 'exclamation-circle-fill' : 'info-circle-fill';
    const iconColor = type === 'success' ? '#0a66c2' : type === 'error' ? '#e74c3c' : '#f39c12';
    
    notification.innerHTML = `
      <div class="d-flex align-items-center p-3">
        <i class="bi bi-${icon}" style="color: ${iconColor}; font-size: 20px; margin-right: 12px;"></i>
        <div class="flex-grow-1">
          <p class="mb-0 fw-medium" style="font-size: 14px; color: #2d2d2d;">${message}</p>
          <small class="text-muted">Maintenant</small>
        </div>
        <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    
    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    
    if (!document.querySelector('style[data-linkedin-notifications]')) {
      style.setAttribute('data-linkedin-notifications', 'true');
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }
}

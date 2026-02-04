import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService, Profile, ProfileExperience, ProfileEducation, ProfileSkill } from '../services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditing = false;
  activeTab = 'experience';
  
  // Observables
  profile$!: Observable<Profile>;
  experiences$!: Observable<ProfileExperience[]>;
  education$!: Observable<ProfileEducation[]>;
  skills$!: Observable<ProfileSkill[]>;
  
  // Current data
  currentProfile: Profile | null = null;
  currentExperiences: ProfileExperience[] = [];
  currentEducation: ProfileEducation[] = [];
  currentSkills: ProfileSkill[] = [];
  
  editProfile: Profile = {
    id: '',
    firstName: '',
    lastName: '',
    headline: '',
    location: '',
    avatar: '',
    coverImage: '',
    about: '',
    connections: 0,
    profileViews: 0,
    postImpressions: 0
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
    this.profileService.incrementProfileViews();
  }

  private loadProfileData(): void {
    this.profile$ = this.profileService.getCurrentProfile();
    this.experiences$ = this.profileService.getExperiences();
    this.education$ = this.profileService.getEducation();
    this.skills$ = this.profileService.getSkills();
    
    // Subscribe to get current data
    this.profile$.subscribe(profile => {
      this.currentProfile = profile;
      this.editProfile = { ...profile };
    });
    
    this.experiences$.subscribe(experiences => {
      this.currentExperiences = experiences;
    });
    
    this.education$.subscribe(education => {
      this.currentEducation = education;
    });
    
    this.skills$.subscribe(skills => {
      this.currentSkills = skills;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.currentProfile) {
      this.editProfile = { ...this.currentProfile };
    }
  }

  saveProfile(): void {
    this.profileService.updateProfile(this.editProfile);
    this.isEditing = false;
    this.showNotification('Profil mis à jour avec succès !', 'success');
    this.loadProfileData(); // Reload to get updated data
  }

  cancelEdit(): void {
    if (this.currentProfile) {
      this.editProfile = { ...this.currentProfile };
    }
    this.isEditing = false;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getSkillLevelLabel(level: string): string {
    const labels = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
      expert: 'Expert'
    };
    return labels[level as keyof typeof labels] || level;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  endorseSkill(skillId: string): void {
    this.profileService.endorseSkill(skillId);
    this.showNotification('Compétence endossée avec succès !', 'success');
    this.loadProfileData(); // Reload to get updated endorsements
  }

  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
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

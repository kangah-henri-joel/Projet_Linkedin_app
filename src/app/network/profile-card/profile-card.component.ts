import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../services/network.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
  @Input() isLoading: boolean = false;
  @Output() connected = new EventEmitter<string>();
  @Output() messageClicked = new EventEmitter<string>();
  @Output() profileClicked = new EventEmitter<string>();

  onConnect(): void {
    if (!this.profile.isConnected && !this.isLoading) {
      this.connected.emit(this.profile.id);
    }
  }

  onMessage(): void {
    this.messageClicked.emit(this.profile.id);
  }

  onProfileClick(): void {
    this.profileClicked.emit(this.profile.id);
  }

  getProfileType(): string {
    switch (this.profile.category) {
      case 'school':
        return this.profile.school || 'École';
      case 'company':
        return this.profile.company;
      default:
        return `${this.profile.firstName} ${this.profile.lastName}`;
    }
  }

  getProfileSubtext(): string {
    switch (this.profile.category) {
      case 'school':
        return `${this.profile.connections} anciens élèves`;
      case 'company':
        return this.profile.position || 'Rejoindre';
      default:
        return this.profile.headline;
    }
  }

  getActionButtonText(): string {
    if (this.isLoading) {
      return 'Connexion...';
    }
    if (this.profile.isConnected) {
      return 'Connecté';
    }
    switch (this.profile.category) {
      case 'school':
        return 'Suivre';
      case 'company':
        return 'Suivre';
      default:
        return 'Se connecter';
    }
  }

  getActionButtonClass(): string {
    if (this.isLoading) {
      return 'btn-secondary';
    }
    if (this.profile.isConnected) {
      return 'btn-secondary';
    }
    return 'btn-primary';
  }

  isButtonDisabled(): boolean {
    return this.profile.isConnected || this.isLoading;
  }
}

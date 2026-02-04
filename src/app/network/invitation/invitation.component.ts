import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invitation } from '../../services/network.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent {
  @Input() invitation!: Invitation;
  @Output() accepted = new EventEmitter<string>();
  @Output() ignored = new EventEmitter<string>();

  onAccept(): void {
    this.accepted.emit(this.invitation.id);
  }

  onIgnore(): void {
    this.ignored.emit(this.invitation.id);
  }

  getFormattedDate(): string {
    const date = new Date(this.invitation.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays} jours`;
    if (diffDays <= 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  }
}

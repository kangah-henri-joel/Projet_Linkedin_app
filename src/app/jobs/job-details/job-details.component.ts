import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  @Input() job!: Job;
  @Output() applyJob = new EventEmitter<string>();

  onApply(): void {
    this.applyJob.emit(this.job.id);
  }

  getExperienceLabel(experience: string): string {
    const labels: { [key: string]: string } = {
      'entry': 'Débutant',
      'mid': 'Intermédiaire',
      'senior': 'Senior',
      'executive': 'Direction'
    };
    return labels[experience] || experience;
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      'contract': 'Contrat',
      'internship': 'Stage'
    };
    return labels[type] || type;
  }

  getPostedDateLabel(date: string): string {
    const posted = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays} jours`;
    if (diffDays <= 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  }
}

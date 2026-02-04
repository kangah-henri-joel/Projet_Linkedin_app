import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../services/job.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job!: Job;
  @Output() jobSelected = new EventEmitter<Job>();
  @Output() jobApplied = new EventEmitter<string>();
  @Output() jobSaved = new EventEmitter<string>();
  @Output() jobShared = new EventEmitter<string>();
  @Output() companyClicked = new EventEmitter<string>();

  onJobClick(): void {
    this.jobSelected.emit(this.job);
  }

  onApplyClick(event: Event): void {
    event.stopPropagation();
    this.jobApplied.emit(this.job.id);
  }

  onSaveClick(event: Event): void {
    event.stopPropagation();
    this.jobSaved.emit(this.job.id);
  }

  onShareClick(event: Event): void {
    event.stopPropagation();
    this.jobShared.emit(this.job.id);
  }

  onCompanyClick(event: Event): void {
    event.stopPropagation();
    this.companyClicked.emit(this.job.company);
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

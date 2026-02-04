import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../services/job.service';
import { Observable } from 'rxjs';
import { JobCardComponent } from './job-card/job-card.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, JobCardComponent, JobDetailsComponent, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  selectedJob$!: Observable<Job | undefined>;
  
  searchQuery = '';
  filters = {
    location: '',
    type: '',
    experience: ''
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobs$ = this.jobService.searchJobs(this.searchQuery, this.filters);
  }

  onSearch(): void {
    this.loadJobs();
  }

  onFilterChange(): void {
    this.loadJobs();
  }

  selectJob(job: Job): void {
    this.selectedJob$ = this.jobService.getJobById(job.id);
  }

  applyToJob(jobId: string): void {
    this.jobService.applyToJob(jobId).subscribe({
      next: () => {
        console.log('Candidature soumise pour l\'emploi:', jobId);
        this.showNotification('Candidature soumise avec succès !', 'success');
        this.loadJobs(); // Recharger pour mettre à jour l'état
      },
      error: () => {
        console.error('Erreur lors de la soumission de la candidature:', jobId);
        this.showNotification('Erreur lors de la soumission de la candidature', 'error');
      }
    });
  }

  saveJob(jobId: string): void {
    this.jobService.saveJob(jobId).subscribe({
      next: () => {
        console.log('Emploi sauvegardé:', jobId);
        this.showNotification('Emploi sauvegardé dans vos favoris !', 'success');
        this.loadJobs(); // Recharger pour mettre à jour l'état
      },
      error: () => {
        console.error('Erreur lors de la sauvegarde de l\'emploi:', jobId);
        this.showNotification('Erreur lors de la sauvegarde de l\'emploi', 'error');
      }
    });
  }

  shareJob(jobId: string): void {
    // Créer un lien vers l'offre d'emploi
    const jobUrl = `${window.location.origin}/jobs/${jobId}`;
    
    // Copier le lien dans le presse-papiers
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(jobUrl).then(() => {
        this.showNotification('Lien de l\'emploi copié dans le presse-papiers !', 'success');
      }).catch(() => {
        this.fallbackCopyToClipboard(jobUrl);
      });
    } else {
      this.fallbackCopyToClipboard(jobUrl);
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showNotification('Lien de l\'emploi copié dans le presse-papiers !', 'success');
    } catch (err) {
      this.showNotification('Erreur lors de la copie du lien', 'error');
    }
    
    document.body.removeChild(textArea);
  }

  viewCompanyWebsite(company: string): void {
    // Simuler la navigation vers le site de l'entreprise
    const companyUrls: { [key: string]: string } = {
      'TechCorp Solutions': 'https://www.techcorp.com',
      'Digital Innovations': 'https://www.digitalinnovations.com',
      'Creative Studio': 'https://www.creativestudio.com',
      'CloudTech Systems': 'https://www.cloudtech.com',
      'StartupHub': 'https://www.startuphub.com',
      'Innovation Labs': 'https://www.innovationlabs.com'
    };
    
    const url = companyUrls[company] || 'https://www.google.com';
    window.open(url, '_blank');
    this.showNotification(`Navigation vers le site de ${company}`, 'info');
  }

  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}

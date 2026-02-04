import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  postedDate: string;
  description: string;
  requirements: string[];
  salary?: string;
  logo?: string;
  applicants?: number;
  hasApplied?: boolean;
  isSaved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = signal<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Paris, France',
      type: 'full-time',
      experience: 'senior',
      postedDate: '2024-01-15',
      description: 'Nous recherchons un développeur frontend senior expérimenté pour rejoindre notre équipe innovante. Vous travaillerez sur des applications web modernes utilisant les dernières technologies.',
      requirements: [
        '5+ ans d\'expérience en développement frontend',
        'Maîtrise d\'Angular, React ou Vue.js',
        'Expérience avec TypeScript',
        'Connaissance des bonnes pratiques UX/UI',
        'Anglais professionnel'
      ],
      salary: '60k€ - 80k€',
      logo: 'assets/images/amie.jpg',
      applicants: 45,
      hasApplied: false,
      isSaved: false
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'Digital Innovations',
      location: 'Lyon, France',
      type: 'full-time',
      experience: 'mid',
      postedDate: '2024-01-14',
      description: 'Rejoignez notre équipe de développement pour construire des solutions web complètes. Vous travaillerez sur toute la stack technologique, de la base de données à l\'interface utilisateur.',
      requirements: [
        '3-5 ans d\'expérience en développement web',
        'Expérience avec Node.js et un framework frontend',
        'Connaissance des bases de données SQL et NoSQL',
        'Capacité à travailler en équipe agile',
        'Autonome et proactif'
      ],
      salary: '45k€ - 65k€',
      logo: 'assets/images/ami2.png',
      applicants: 32,
      hasApplied: false,
      isSaved: false
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      location: 'Marseille, France',
      type: 'contract',
      experience: 'mid',
      postedDate: '2024-01-13',
      description: 'Nous cherchons un designer UX/UI talentueux pour créer des interfaces utilisateur exceptionnelles et améliorer l\'expérience utilisateur de nos produits.',
      requirements: [
        '3+ ans d\'expérience en design UX/UI',
        'Maîtrise de Figma, Adobe Creative Suite',
        'Portfolio démontrant des projets similaires',
        'Compréhension des principes de design thinking',
        'Capacité à collaborer avec les développeurs'
      ],
      salary: '40k€ - 55k€',
      logo: 'assets/images/publAmi3.jpg',
      applicants: 28,
      hasApplied: false,
      isSaved: false
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Remote',
      type: 'full-time',
      experience: 'senior',
      postedDate: '2024-01-12',
      description: 'Nous recherchons un ingénieur DevOps pour optimiser notre infrastructure cloud et améliorer nos processus de déploiement continu.',
      requirements: [
        '4+ ans d\'expérience en DevOps',
        'Expertise en AWS, Azure ou GCP',
        'Expérience avec Docker et Kubernetes',
        'Connaissance des outils CI/CD',
        'Scripting (Python, Bash)'
      ],
      salary: '65k€ - 85k€',
      logo: 'assets/images/ami6.jpg',
      applicants: 19,
      hasApplied: false,
      isSaved: false
    },
    {
      id: '5',
      title: 'Junior Backend Developer',
      company: 'StartupHub',
      location: 'Bordeaux, France',
      type: 'full-time',
      experience: 'entry',
      postedDate: '2024-01-11',
      description: 'Opportunité parfaite pour un développeur backend junior de rejoindre une startup dynamique et de faire ses preuves.',
      requirements: [
        '1-2 ans d\'expérience en développement backend',
        'Connaissance de Node.js, Python ou Java',
        'Bases de données SQL',
        'Envie d\'apprendre et de grandir',
        'Passion pour la technologie'
      ],
      salary: '30k€ - 40k€',
      logo: 'assets/images/ami6.jpg',
      applicants: 67,
      hasApplied: false,
      isSaved: false
    },
    {
      id: '6',
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Paris, France',
      type: 'full-time',
      experience: 'senior',
      postedDate: '2024-01-10',
      description: 'Nous cherchons un Product Manager expérimenté pour diriger le développement de nos produits innovants.',
      requirements: [
        '5+ ans d\'expérience en product management',
        'Expérience avec les méthodes agiles',
        'Compétences en analyse de données',
        'Excellentes capacités de communication',
        'Vision stratégique'
      ],
      salary: '70k€ - 90k€',
      logo: 'assets/images/amis1.jpg',
      applicants: 23,
      hasApplied: false,
      isSaved: false
    }
  ]);

  getJobs(): Observable<Job[]> {
    return of(this.jobs());
  }

  getJobById(id: string): Observable<Job | undefined> {
    const job = this.jobs().find(j => j.id === id);
    return of(job);
  }

  searchJobs(query: string, filters: any = {}): Observable<Job[]> {
    let filteredJobs = this.jobs();

    // Recherche par titre ou entreprise
    if (query) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filtres
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }

    if (filters.experience) {
      filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
    }

    return of(filteredJobs);
  }

  applyToJob(jobId: string): Observable<boolean> {
    // Simulation d'une candidature
    const jobs = this.jobs();
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      job.hasApplied = true;
      job.applicants = (job.applicants || 0) + 1;
      this.jobs.set([...jobs]);
      return of(true);
    }
    return of(false);
  }

  saveJob(jobId: string): Observable<boolean> {
    // Simulation d'une sauvegarde
    const jobs = this.jobs();
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      job.isSaved = true;
      this.jobs.set([...jobs]);
      return of(true);
    }
    return of(false);
  }
}

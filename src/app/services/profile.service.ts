import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  avatar: string;
  coverImage: string;
  about: string;
  connections: number;
  profileViews: number;
  postImpressions: number;
}

export interface ProfileExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface ProfileEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface ProfileSkill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsements: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfile = signal<Profile>({
    id: 'current-user',
    firstName: 'KANGAH',
    lastName: 'HENRI JOEL',
    headline: 'Étudiant en EIT à INPHB',
    location: 'Abidjan, Côte d\'Ivoire',
    avatar: 'assets/images/KangahHenriJoel.jpg',
    coverImage: 'assets/images/amis1.jpg',
    about: 'Passionné par le développement web et les nouvelles technologies. Actuellement en formation à l\'INPHB en EIT, je cherche à développer mes compétences en Angular, TypeScript et Node.js. Ouvert aux opportunités de stage et de collaboration sur des projets innovants.',
    connections: 523,
    profileViews: 127,
    postImpressions: 2456
  });

  private experiences = signal<ProfileExperience[]>([
    {
      id: '1',
      title: 'Développeur Web Stagiaire',
      company: 'TechCorp Solutions',
      location: 'Abidjan, Côte d\'Ivoire',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      current: false,
      description: 'Développement d\'applications web avec Angular et Node.js. Participation à la conception d\'interfaces utilisateur modernes et à l\'optimisation des performances.'
    },
    {
      id: '2',
      title: 'Assistant Développeur',
      company: 'Digital Innovations',
      location: 'Abidjan, Côte d\'Ivoire',
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      current: false,
      description: 'Support technique et développement de fonctionnalités pour des applications existantes. Apprentissage des bonnes pratiques de développement agile.'
    }
  ]);

  private education = signal<ProfileEducation[]>([
    {
      id: '1',
      school: 'Institut National Polytechnique Houphouët-Boigny (INPHB)',
      degree: 'Licence Professionnelle',
      field: 'Engineering in Information Technology (EIT)',
      startDate: '2022-09-01',
      current: true,
      description: 'Formation spécialisée en ingénierie des technologies de l\'information avec focus sur le développement web, les bases de données et les systèmes d\'information.'
    }
  ]);

  private skills = signal<ProfileSkill[]>([
    { id: '1', name: 'Angular', level: 'intermediate', endorsements: 12 },
    { id: '2', name: 'TypeScript', level: 'intermediate', endorsements: 8 },
    { id: '3', name: 'HTML/CSS', level: 'advanced', endorsements: 15 },
    { id: '4', name: 'JavaScript', level: 'intermediate', endorsements: 10 },
    { id: '5', name: 'Node.js', level: 'beginner', endorsements: 5 },
    { id: '6', name: 'Bootstrap', level: 'advanced', endorsements: 18 }
  ]);

  // Getters
  getCurrentProfile(): Observable<Profile> {
    return of(this.currentProfile());
  }

  getExperiences(): Observable<ProfileExperience[]> {
    return of(this.experiences());
  }

  getEducation(): Observable<ProfileEducation[]> {
    return of(this.education());
  }

  getSkills(): Observable<ProfileSkill[]> {
    return of(this.skills());
  }

  // Update methods
  updateProfile(profileData: Partial<Profile>): void {
    const currentProfile = this.currentProfile();
    this.currentProfile.set({ ...currentProfile, ...profileData });
  }

  addExperience(experience: Omit<ProfileExperience, 'id'>): void {
    const newExperience: ProfileExperience = {
      ...experience,
      id: Date.now().toString()
    };
    this.experiences.set([...this.experiences(), newExperience]);
  }

  updateExperience(id: string, experienceData: Partial<ProfileExperience>): void {
    const experiences = this.experiences();
    const updatedExperiences = experiences.map(exp => 
      exp.id === id ? { ...exp, ...experienceData } : exp
    );
    this.experiences.set(updatedExperiences);
  }

  deleteExperience(id: string): void {
    const experiences = this.experiences();
    this.experiences.set(experiences.filter(exp => exp.id !== id));
  }

  addEducation(education: Omit<ProfileEducation, 'id'>): void {
    const newEducation: ProfileEducation = {
      ...education,
      id: Date.now().toString()
    };
    this.education.set([...this.education(), newEducation]);
  }

  updateEducation(id: string, educationData: Partial<ProfileEducation>): void {
    const education = this.education();
    const updatedEducation = education.map(edu => 
      edu.id === id ? { ...edu, ...educationData } : edu
    );
    this.education.set(updatedEducation);
  }

  deleteEducation(id: string): void {
    const education = this.education();
    this.education.set(education.filter(edu => edu.id !== id));
  }

  addSkill(skill: Omit<ProfileSkill, 'id'>): void {
    const newSkill: ProfileSkill = {
      ...skill,
      id: Date.now().toString()
    };
    this.skills.set([...this.skills(), newSkill]);
  }

  updateSkill(id: string, skillData: Partial<ProfileSkill>): void {
    const skills = this.skills();
    const updatedSkills = skills.map(skill => 
      skill.id === id ? { ...skill, ...skillData } : skill
    );
    this.skills.set(updatedSkills);
  }

  deleteSkill(id: string): void {
    const skills = this.skills();
    this.skills.set(skills.filter(skill => skill.id !== id));
  }

  endorseSkill(skillId: string): void {
    const skills = this.skills();
    const updatedSkills = skills.map(skill => 
      skill.id === skillId ? { ...skill, endorsements: skill.endorsements + 1 } : skill
    );
    this.skills.set(updatedSkills);
  }

  // Utility methods
  incrementProfileViews(): void {
    const currentProfile = this.currentProfile();
    this.currentProfile.set({ 
      ...currentProfile, 
      profileViews: currentProfile.profileViews + 1 
    });
  }

  incrementConnections(): void {
    const currentProfile = this.currentProfile();
    this.currentProfile.set({ 
      ...currentProfile, 
      connections: currentProfile.connections + 1 
    });
  }

  incrementPostImpressions(count: number = 1): void {
    const currentProfile = this.currentProfile();
    this.currentProfile.set({ 
      ...currentProfile, 
      postImpressions: currentProfile.postImpressions + count 
    });
  }
}

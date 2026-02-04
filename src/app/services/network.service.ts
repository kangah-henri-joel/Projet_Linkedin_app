import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  company: string;
  location: string;
  avatar?: string;
  connections: number;
  isConnected: boolean;
  mutualConnections?: number;
  category: 'people' | 'school' | 'company';
  school?: string;
  position?: string;
}

export interface Invitation {
  id: string;
  sender: Profile;
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private profiles = signal<Profile[]>([
    {
      id: '1',
      firstName: 'Marie',
      lastName: 'Dubois',
      headline: 'Senior Frontend Developer at TechCorp',
      company: 'TechCorp Solutions',
      location: 'Paris, France',
      avatar: 'assets/images/amie.jpg',
      connections: 523,
      isConnected: false,
      mutualConnections: 12,
      category: 'people'
    },
    {
      id: '2',
      firstName: 'Pierre',
      lastName: 'Martin',
      headline: 'Product Manager at Digital Innovations',
      company: 'Digital Innovations',
      location: 'Lyon, France',
      avatar: 'assets/images/ami2.png',
      connections: 892,
      isConnected: false,
      mutualConnections: 8,
      category: 'people'
    },
    {
      id: '3',
      firstName: 'Sophie',
      lastName: 'Bernard',
      headline: 'UX Designer at DesignHub',
      company: 'DesignHub',
      location: 'Marseille, France',
      avatar: 'assets/images/ami4.jpg',
      connections: 342,
      isConnected: false,
      mutualConnections: 15,
      category: 'people'
    },
    {
      id: '4',
      firstName: 'Thomas',
      lastName: 'Petit',
      headline: 'Data Scientist at Analytics Pro',
      company: 'Analytics Pro',
      location: 'Toulouse, France',
      avatar: 'assets/images/ami5.jpg',
      connections: 678,
      isConnected: false,
      mutualConnections: 6,
      category: 'people'
    },
    {
      id: '5',
      firstName: 'Claire',
      lastName: 'Robert',
      headline: 'Marketing Manager at StartupHub',
      company: 'StartupHub',
      location: 'Bordeaux, France',
      avatar: 'assets/images/ami6.jpg',
      connections: 445,
      isConnected: true,
      mutualConnections: 3,
      category: 'people'
    },
    {
      id: '6',
      firstName: 'INPHB',
      lastName: 'Institut',
      headline: 'Institut National Polytechnique Houphouët-Boigny',
      company: 'Education',
      location: 'Abidjan, Côte d\'Ivoire',
      avatar: 'assets/images/amis1.jpg',
      connections: 15600,
      isConnected: false,
      mutualConnections: 234,
      category: 'school'
    },
    {
      id: '7',
      firstName: 'TechCorp',
      lastName: 'Solutions',
      headline: 'Leading Technology Solutions Provider',
      company: 'Technology',
      location: 'Issy-les-Moulineaux, France',
      avatar: 'assets/images/publAmi3.jpg',
      connections: 38900,
      isConnected: false,
      category: 'company',
      position: 'Rejoindre l\'entreprise'
    },
    {
      id: '8',
      firstName: 'KANGAH',
      lastName: 'HENRI JOEL',
      headline: 'Étudiant en EIT à INPHB',
      company: 'INPHB',
      location: 'Abidjan, Côte d\'Ivoire',
      avatar: 'assets/images/KangahHenriJoel.jpg',
      connections: 523, 
      isConnected: false,
      mutualConnections: 15,
      category: 'people'
    }
  ]);

  private userProfile = signal<Profile>({
    id: 'current-user',
    firstName: 'KANGAH',
    lastName: 'HENRI JOEL',
    headline: 'Étudiant en EIT à INPHB',
    company: 'INPHB',
    location: 'Abidjan, Côte d\'Ivoire',
    avatar: 'assets/images/KangahHenriJoel.jpg',
    connections: 523,
    isConnected: true,
    category: 'people'
  });

  private invitations = signal<Invitation[]>([
    {
      id: 'inv1',
      sender: {
        id: '9',
        firstName: 'Claire',
        lastName: 'Robert',
        headline: 'Marketing Manager at StartupHub',
        company: 'StartupHub',
        location: 'Bordeaux, France',
        avatar: 'assets/images/MonProfil.jpeg',
        connections: 178,
        isConnected: false,
        mutualConnections: 3,
        category: 'people'
      },
      message: 'Bonjour ! J\'aimerais beaucoup ajouter à mon réseau professionnel.',
      date: '2024-01-15'
    },
    {
      id: 'inv2',
      sender: {
        id: '10',
        firstName: 'Nicolas',
        lastName: 'Leroy',
        headline: 'Data Scientist at Innovation Labs',
        company: 'Innovation Labs',
        location: 'Paris, France',
        avatar: 'assets/images/mespubication1.jpg',
        connections: 667,
        isConnected: false,
        mutualConnections: 7,
        category: 'people'
      },
      message: 'Intéressé par votre profil, connectons-nous !',
      date: '2024-01-14'
    }
  ]);

  getProfiles(): Observable<Profile[]> {
    return of(this.profiles());
  }

  getProfilesByCategory(category: string): Observable<Profile[]> {
    const filtered = this.profiles().filter(profile => profile.category === category);
    return of(filtered);
  }

  getInvitations(): Observable<Invitation[]> {
    return of(this.invitations());
  }

  connectToProfile(profileId: string): Observable<boolean> {
    const profiles = this.profiles();
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      profile.isConnected = true;
      this.profiles.set([...profiles]);
      return of(true);
    }
    return of(false);
  }

  acceptInvitation(invitationId: string): Observable<boolean> {
    const invitations = this.invitations();
    const updatedInvitations = invitations.filter(inv => inv.id !== invitationId);
    this.invitations.set(updatedInvitations);
    return of(true);
  }

  ignoreInvitation(invitationId: string): Observable<boolean> {
    const invitations = this.invitations();
    const updatedInvitations = invitations.filter(inv => inv.id !== invitationId);
    this.invitations.set(updatedInvitations);
    return of(true);
  }

  searchProfiles(query: string): Observable<Profile[]> {
    if (!query) {
      return of(this.profiles());
    }
    
    const filtered = this.profiles().filter(profile => 
      profile.firstName.toLowerCase().includes(query.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(query.toLowerCase()) ||
      profile.headline.toLowerCase().includes(query.toLowerCase()) ||
      profile.company.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postText = '';
  posts = [
    {
      id: '0',
      author: 'KANGAH HENRI JOEL',
      authorTitle: 'Étudiant en EIT à INPHB',
      authorAvatar: 'assets/images/KangahHenriJoel.jpg',
      content: 'Passionné par le développement web et les nouvelles technologies ! Actuellement en formation à l\'INPHB, je cherche à développer mes compétences en Angular et TypeScript. N\'hésitez pas à me contacter pour des opportunités de stage ou de collaboration ! #Etudiant #INPHB #WebDevelopment #Angular',
      image: 'assets/images/Mespublication.jpg',
      time: '1 heure',
      likes: 45,
      comments: 12,
      shares: 8,
      hasLiked: false
    },
    {
      id: '1',
      author: 'Marie Dubois',
      authorTitle: 'Senior Frontend Developer at TechCorp',
      authorAvatar: 'assets/images/ami2.png',
      content: 'Superbe journée de hackathon aujourd\'hui ! Notre équipe a développé une application révolutionnaire en utilisant Angular et Node.js. Merci à toute l\'équipe pour cette collaboration incroyable ! 🚀 #Hackathon #TeamWork #Innovation',
      image: 'assets/images/PubliAmi2.jpg',
      time: '3 heures',
      likes: 89,
      comments: 23,
      shares: 15,
      hasLiked: false
    },
    {
      id: '2',
      author: 'Pierre Martin',
      authorTitle: 'Product Manager at Digital Innovations',
      authorAvatar: 'assets/images/ami3.jpg',
      content: 'Fier de partager notre dernière réussite ! Nous avons lancé une nouvelle plateforme qui transforme complètement l\'expérience utilisateur. Un grand merci à toute l\'équipe pour leur dévouement et leur expertise. #ProductLaunch #Success #Innovation',
      image: 'assets/images/publAmi1.jpg',
      time: '5 heures',
      likes: 156,
      comments: 34,
      shares: 28,
      hasLiked: false
    },
    {
      id: '3',
      author: 'Sophie Bernard',
      authorTitle: 'UX Designer at DesignHub',
      authorAvatar: 'assets/images/ami4.jpg',
      content: 'Nouveaux designs disponibles ! J\'ai travaillé sur une interface moderne et intuitive pour une application mobile. Le focus était sur l\'expérience utilisateur et l\'accessibilité. Qu\'en pensez-vous ? #UXDesign #UI #DesignThinking',
      image: 'assets/images/PubliAmie5.jpg',
      time: 'Hier',
      likes: 67,
      comments: 18,
      shares: 9,
      hasLiked: false
    },
    {
      id: '4',
      author: 'Thomas Petit',
      authorTitle: 'Data Scientist at Analytics Pro',
      authorAvatar: 'assets/images/ami5.jpg',
      content: 'Analyse intéressante des tendances du marché tech pour 2024. L\'IA et le Machine Learning continuent de dominer, mais je vois aussi une forte croissance dans les domaines de la blockchain et de l\'IoT. #DataScience #TechTrends #AI',
      image: 'assets/images/mespubication1.jpg',
      time: '2 jours',
      likes: 234,
      comments: 45,
      shares: 67,
      hasLiked: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  createPost(): void {
    if (this.postText.trim()) {
      const newPost = {
        id: Date.now().toString(),
        author: 'KANGAH HENRI JOEL',
        authorTitle: 'Étudiant en EIT à INPHB',
        authorAvatar: 'assets/images/KangahHenriJoel.jpg',
        content: this.postText,
        image: '',
        time: 'Maintenant',
        likes: 0,
        comments: 0,
        shares: 0,
        hasLiked: false
      };
      
      this.posts.unshift(newPost);
      this.postText = '';
      this.showNotification('Publication créée avec succès !', 'success');
    }
  }

  likePost(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.hasLiked = !post.hasLiked;
      post.likes += post.hasLiked ? 1 : -1;
    }
  }

  commentOnPost(postId: string): void {
    this.showNotification('Fonction de commentaires bientôt disponible !', 'info');
  }

  sharePost(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.shares++;
      this.showNotification('Publication partagée !', 'success');
    }
  }

  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
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
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}

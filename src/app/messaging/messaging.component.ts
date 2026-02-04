import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  conversations = [
    {
      id: '1',
      name: 'Marie Dubois',
      avatar: 'assets/images/ami2.png',
      lastMessage: 'Super ! On peut en discuter demain ?',
      time: '10:30',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Pierre Martin',
      avatar: 'assets/images/ami3.jpg',
      lastMessage: 'Merci pour les informations sur le projet',
      time: 'Hier',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      avatar: 'assets/images/ami4.jpg',
      lastMessage: 'Les designs sont prêts !',
      time: '2 jours',
      unread: 1,
      online: true
    },
    {
      id: '5',
      name: 'KANGAH HENRI JOEL',
      avatar: 'assets/images/KangahHenriJoel.jpg',
      lastMessage: 'Bonjour ! Intéressé par votre profil étudiant',
      time: 'Il y a 1 semaine',
      unread: 0,
      online: false
    }
  ];

  selectedConversation: any = null;
  messageText = '';
  messages = [
    {
      id: '1',
      sender: 'Marie Dubois',
      content: 'Salut ! Comment allez-vous ?',
      time: '10:15',
      isMe: false
    },
    {
      id: '2',
      sender: 'Moi',
      content: 'Bonjour Marie ! Ça va bien, merci. Et vous ?',
      time: '10:20',
      isMe: true
    },
    {
      id: '3',
      sender: 'Marie Dubois',
      content: 'Très bien ! Je voulais vous parler du nouveau projet Angular',
      time: '10:25',
      isMe: false
    },
    {
      id: '4',
      sender: 'Moi',
      content: 'Avec plaisir ! Je suis très intéressé',
      time: '10:28',
      isMe: true
    },
    {
      id: '5',
      sender: 'Marie Dubois',
      content: 'Super ! On peut en discuter demain ?',
      time: '10:30',
      isMe: false
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Sélectionner la première conversation par défaut
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }

  selectConversation(conversation: any): void {
    this.selectedConversation = conversation;
    // Marquer les messages comme lus
    conversation.unread = 0;
  }

  sendMessage(): void {
    if (this.messageText.trim() && this.selectedConversation) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'Moi',
        content: this.messageText,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      
      this.messages.push(newMessage);
      
      // Mettre à jour la dernière conversation
      this.selectedConversation.lastMessage = this.messageText;
      this.selectedConversation.time = 'Maintenant';
      
      this.messageText = '';
      
      // Simuler une réponse après 2 secondes
      setTimeout(() => {
        this.simulateResponse();
      }, 2000);
    }
  }

  simulateResponse(): void {
    if (this.selectedConversation) {
      const responses = [
        'Merci pour votre message !',
        'Je vais regarder ça et je vous reviens.',
        'Excellente idée !',
        'Parfait, on peut en discuter plus en détail.',
        'Je suis d\'accord avec vous.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: Date.now().toString(),
        sender: this.selectedConversation.name,
        content: randomResponse,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };
      
      this.messages.push(responseMessage);
      this.selectedConversation.lastMessage = randomResponse;
      this.selectedConversation.time = 'Maintenant';
    }
  }

  deleteConversation(conversationId: string): void {
    this.conversations = this.conversations.filter(c => c.id !== conversationId);
    if (this.selectedConversation?.id === conversationId) {
      this.selectedConversation = null;
    }
    this.showNotification('Conversation supprimée', 'info');
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

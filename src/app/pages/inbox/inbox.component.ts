import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: string;
  text: string;
}

interface UserConversation {
  id: number;
  name: string;
  messages: Message[];
}

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {
  users: UserConversation[] = [];
  selectedUser: UserConversation | null = null;

  ngOnInit(): void {
    this.loadExampleConversations();
  }

  loadExampleConversations(): void {
    this.users = [
      {
        id: 1,
        name: 'ONG Amiga',
        messages: [
          { sender: 'ONG Amiga', text: 'Olá! Vimos seu interesse em adotar o Rex. Podemos conversar sobre isso?' },
          { sender: 'Você', text: 'Olá! Sim, claro! Tenho algumas perguntas sobre o Rex.' },
          { sender: 'ONG Amiga', text: 'Ótimo! Pode perguntar. Estamos à disposição.' }
        ]
      },
      {
        id: 2,
        name: 'João Silva',
        messages: [
          { sender: 'João Silva', text: 'Oi! Você ainda tem interesse no gatinho que postou?' },
          { sender: 'Você', text: 'Olá João! Sim, ele ainda está disponível. Gostaria de saber mais?' }
        ]
      }
    ];
    // Optionally select the first user by default
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
    }
  }

  selectUser(user: UserConversation): void {
    this.selectedUser = user;
  }

  deleteConversation(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    if (this.selectedUser?.id === userId) {
      this.selectedUser = null; // Deselect if the deleted conversation was active
    }
  }
}
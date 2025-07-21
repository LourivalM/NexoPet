import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-friends.component.html',
  styleUrl: './add-friends.component.css'
})
export class AddFriendsComponent implements OnInit {
  searchResults: User[] = [];
  myContacts: User[] = [];

  ngOnInit(): void {
    this.loadExampleData();
  }

  loadExampleData(): void {
    // Example search results (simulating a search)
    this.searchResults = [
      { id: 1, name: 'Ana Paula' },
      { id: 2, name: 'Carlos Eduardo' },
      { id: 3, name: 'Mariana Costa' }
    ];

    // Example contacts
    this.myContacts = [
      { id: 4, name: 'Pedro Almeida' },
      { id: 5, name: 'Juliana Lima' }
    ];
  }

  sendInvite(userId: number): void {
    console.log(`Convite enviado para o usuário com ID: ${userId}`);
    // Implement real logic to send invite (e.g., API call)
    // After sending, you might want to remove the user from searchResults or update their status
    this.searchResults = this.searchResults.filter(user => user.id !== userId);
  }

  deleteContact(contactId: number): void {
    console.log(`Contato com ID ${contactId} excluído.`);
    // Implement real logic to delete contact (e.g., API call)
    this.myContacts = this.myContacts.filter(contact => contact.id !== contactId);
  }
}
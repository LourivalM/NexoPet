import { Component } from '@angular/core';
import { BemVindo } from "../../components/bem-vindo/bem-vindo";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [BemVindo, CommonModule],
  standalone: true,
  providers: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
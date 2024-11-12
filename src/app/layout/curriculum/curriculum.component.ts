import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [MatDividerModule, MatChipsModule, MatIconModule, MatTooltipModule, MatCardModule, MatCard, RouterModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss'
})
export class CurriculumComponent {
  constructor() {

  }
  whatsapp() {
    window.open('https://wa.me/3324241307');
  }
  sendEmail() {
    window.location.href = 'mailto:crisalbaworkspace@gmail.com';
  }
  openGitHub() {
    window.open('https://github.com/crisalbaws');
  }
}

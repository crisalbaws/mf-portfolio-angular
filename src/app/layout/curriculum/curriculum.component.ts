import { Component, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [MatDividerModule, MatDividerModule,
    MatExpansionModule, MatChipsModule, MatIconModule, MatTooltipModule, MatCardModule, RouterModule, CommonModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss',
})
export class CurriculumComponent {
  frontendSkills = ['Angular', 'React', 'Ionic', 'TypeScript', 'Single SPA'];
  languages = ['TypeScript', 'JavaScript', 'C#', 'Kotlin'];
  tools = ['AWS S3', 'GitHub', 'Figma', 'Jira'];
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
  openCV(): void {
    window.open('https://portfolio-caaws-public.s3.us-east-1.amazonaws.com/assets/cv_ES.pdf');
  }
}

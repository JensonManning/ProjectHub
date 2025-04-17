import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shadcn-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shadcn-demo.component.html',
  styleUrl: './shadcn-demo.component.scss'
})
export class ShadcnDemoComponent {
  constructor() {}
} 
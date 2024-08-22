import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-empty-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyLayoutComponent {

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PrimeNgModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}

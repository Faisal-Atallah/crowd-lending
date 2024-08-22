import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent {
  constructor(public loadingIndicatorService: LoadingIndicatorService) {
  }

}

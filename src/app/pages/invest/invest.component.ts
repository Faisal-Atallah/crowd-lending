import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-invest',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestComponent {

}

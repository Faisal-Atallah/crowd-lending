import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-investment-sector',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './investment-sector.component.html',
  styleUrls: ['./investment-sector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentSectorComponent {

}

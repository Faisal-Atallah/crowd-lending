import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-investment-sector-details',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentSectorDetailsComponent {
  @Input() sectorName: string;
  @Input() totalInvestments: string;
  @Input() image: string;
  @Input() roi: string;
}

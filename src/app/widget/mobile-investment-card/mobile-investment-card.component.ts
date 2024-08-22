import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-investment-card',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './mobile-investment-card.component.html',
  styleUrls: ['./mobile-investment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileInvestmentCardComponent {
  @Input({ required: true }) image: string;
  @Input({ required: true }) amount: number;
  @Input({ required: true }) title: string;
  @Input({ required: true }) subTitle: string;
  @Input({ required: true }) grade: string;
  @Input({ required: true }) duration: number;
  @Input({ required: true }) roi: number;
  @Input({ required: true }) remaining: number;
  @Input({ required: true }) coverPhoto: string;
}

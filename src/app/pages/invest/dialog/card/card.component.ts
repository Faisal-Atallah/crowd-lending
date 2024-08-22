import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invest } from '../../invets.types';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invest-dialog-card',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestDialogCardComponent {
  @Input() invest: Invest;
}

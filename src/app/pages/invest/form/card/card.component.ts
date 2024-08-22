import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { Invest } from '../../invets.types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCardComponent implements OnInit {
  @Input() invest: Invest;

  /**
   * On Init
   */
  ngOnInit(): void {
  }

}

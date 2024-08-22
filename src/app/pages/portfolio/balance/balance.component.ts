import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-balance',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioBalanceComponent implements OnInit {
  @Input() saving: number;
  @Input() investment: number;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}

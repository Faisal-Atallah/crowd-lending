import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbService } from 'src/app/layout/layouts/common/breadcrumb';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  constructor() {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
  }
 
}

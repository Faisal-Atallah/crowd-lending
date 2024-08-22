import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../portfolio.types';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCategoriesComponent implements OnInit {
  @Input() categories: Category[];

  /**
   * On Init
   */
  ngOnInit(): void {
  }

}

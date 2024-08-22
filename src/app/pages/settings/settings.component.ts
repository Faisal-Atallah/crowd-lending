import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PrimeNgModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  activeTab: number = 0;

  constructor(
  ) {
  }
}

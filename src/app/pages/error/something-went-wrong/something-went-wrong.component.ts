import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-something-went-wrong',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, RouterLink, TranslateModule],
  templateUrl: './something-went-wrong.component.html',
  styleUrls: ['./something-went-wrong.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomethingWentWrongComponent {

}

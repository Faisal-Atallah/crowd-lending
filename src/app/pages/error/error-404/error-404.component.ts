import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, RouterLink, TranslateModule],
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error404Component {

}

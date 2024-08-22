import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { WalletBalanceComponent } from '../balance';
import { WalletOptionsComponent } from '../options';

@Component({
  selector: 'app-wallet-item',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, WalletBalanceComponent, WalletOptionsComponent],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletItemComponent {

}

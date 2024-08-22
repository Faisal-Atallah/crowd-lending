import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-investment-calculator',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './investment-calculator.component.html',
  styleUrl: './investment-calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentCalculatorComponent {

}

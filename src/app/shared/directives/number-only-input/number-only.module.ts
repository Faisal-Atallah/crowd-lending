import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './number-only.directive';

@NgModule({
  imports: [
    NumberOnlyDirective
  ],
  exports: [NumberOnlyDirective]
})
export class NumberOnlyDirectiveModule { }

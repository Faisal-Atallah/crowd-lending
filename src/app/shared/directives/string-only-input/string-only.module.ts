import { NgModule } from '@angular/core';
import { StringOnlyDirective } from './string-only.directive';

@NgModule({
  imports: [
    StringOnlyDirective
  ],
  exports: [StringOnlyDirective]
})
export class StringOnlyDirectiveModule { }

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberOnly]',
  standalone: true
})
export class NumberOnlyDirective {

  /**
   * Constructor
   * @param {ElementRef} _elementRef 
   */
  constructor(private _elementRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._elementRef.nativeElement.value;
    this._elementRef.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

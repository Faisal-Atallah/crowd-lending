import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[stringOnly]',
  standalone: true
})
export class StringOnlyDirective {

  /**
 * Constructor
 * @param {ElementRef} _elementRef 
 */
  constructor(private _elementRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._elementRef.nativeElement.value;
    this._elementRef.nativeElement.value = initalValue.replace(/[^a-zA-Z]/g, '');
    if (initalValue !== this._elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }

}

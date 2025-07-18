import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjMask]',
  standalone: true
})
export class CnpjMaskDirective {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    let formattedValue = '';

    if (value.length > 0) {
      if (value.length <= 2) {
        formattedValue = value;
      } else if (value.length <= 5) {
        formattedValue = `${value.substring(0, 2)}.${value.substring(2, 5)}`;
      } else if (value.length <= 8) {
        formattedValue = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}`;
      } else if (value.length <= 12) {
        formattedValue = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}`;
      } else {
        formattedValue = `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12, 14)}`;
      }
    }

    this.ngControl.valueAccessor?.writeValue(formattedValue);
  }
}
import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    let formattedValue = '';

    if (value.length > 0) {
      if (value.length <= 2) { // (XX
        formattedValue = `(${value}`;
      } else if (value.length <= 7) { // (XX) XXXXX
        formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
      } else if (value.length <= 11) { // (XX) XXXXX-XXXX
        formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
      } else { // More than 11 digits, truncate to 11
        formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
      }
    }

    this.ngControl.valueAccessor?.writeValue(formattedValue);
  }
}
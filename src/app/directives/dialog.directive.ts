import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    event.stopPropagation();
  }

}

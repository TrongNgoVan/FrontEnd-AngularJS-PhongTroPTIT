import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
  private focus = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.focus) {
      window.setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }
}

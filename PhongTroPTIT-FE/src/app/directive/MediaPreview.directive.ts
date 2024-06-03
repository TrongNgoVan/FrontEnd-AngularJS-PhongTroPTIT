import {Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appMediaPreview]'
})
export class MediaPreviewDirective implements OnChanges {

  @Input() image: any;

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnChanges(changes: SimpleChanges) {

    const reader = new FileReader();
    const el = this.el;

    reader.onloadend = e => {
      el.nativeElement.src = reader.result;
    };

    if (this.image) {
      return reader.readAsDataURL(this.image);
    }

  }

}

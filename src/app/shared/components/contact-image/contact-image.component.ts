import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-image',
  templateUrl: './contact-image.component.html',
  styleUrls: ['./contact-image.component.css'],
})
export class ContactImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input('img') set img(newImg: string) {
    this.image = newImg;
  }

  image: string = '';
  defaultUrl: string = '';
}

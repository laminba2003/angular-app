import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: String;
  @Input() template: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}

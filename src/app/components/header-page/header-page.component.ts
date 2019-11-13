import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'header-page-component',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}

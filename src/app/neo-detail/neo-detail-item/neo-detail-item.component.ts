import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-neo-detail-item',
  templateUrl: './neo-detail-item.component.html',
  styleUrls: ['./neo-detail-item.component.scss']
})
export class NeoDetailItemComponent implements OnInit {

  @Input() approachDate: any;

  constructor() { }

  ngOnInit() {
  }

}

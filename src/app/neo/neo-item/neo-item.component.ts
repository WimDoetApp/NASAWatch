import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-neo-item',
  templateUrl: './neo-item.component.html',
  styleUrls: ['./neo-item.component.scss']
})
export class NeoItemComponent implements OnInit {

  @Input() asteroid: any;
  @Input() tab:String;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  lookupAsteroid(){
    console.log(this.asteroid.neo_reference_id);
    this.router.navigate(['/neo-detail', this.asteroid.neo_reference_id]);
  }

}

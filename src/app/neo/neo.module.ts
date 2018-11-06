import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoComponent } from './neo.component';
import { NeoItemComponent } from './neo-item/neo-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NeoComponent, NeoItemComponent]
})
export class NeoModule { }

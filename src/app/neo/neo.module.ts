import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoComponent } from './neo.component';
import { NeoItemComponent } from './neo-item/neo-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NeoComponent, NeoItemComponent]
})
export class NeoModule { }

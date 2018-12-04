import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandsatComponent } from './landsat.component';
import { FormsModule } from '@angular/forms';
import { LandsatItemComponent } from './landsat-item/landsat-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LandsatComponent, LandsatItemComponent]
})
export class LandsatModule { }

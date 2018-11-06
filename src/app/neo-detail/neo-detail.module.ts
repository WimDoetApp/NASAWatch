import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeoDetailComponent } from './neo-detail.component';
import { NeoDetailItemComponent } from './neo-detail-item/neo-detail-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NeoDetailComponent, NeoDetailItemComponent]
})
export class NeoDetailModule { }

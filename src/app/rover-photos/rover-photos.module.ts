import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoverPhotosComponent } from './rover-photos.component';
import { PhotoItemComponent } from './photo-item/photo-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [RoverPhotosComponent, PhotoItemComponent]
})
export class RoverPhotosModule { }

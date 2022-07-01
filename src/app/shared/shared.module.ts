import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSongPipe } from './pipes/time-song.pipe';



@NgModule({
  declarations: [
    TimeSongPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeSongPipe
  ]
})
export class SharedModule { }

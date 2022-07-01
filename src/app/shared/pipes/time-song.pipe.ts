import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSong'
})
export class TimeSongPipe implements PipeTransform {

  transform(value: number): unknown {

    const addZero = (data: string | number) => {
      if (data < 10) {
        return "0" + data;
      } else {
        return "" + data;
      }
    }

    var minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (value % (1000 * 60)) / 1000;

    return `${addZero(minutes)}:${addZero(Math.floor(seconds))}`;
  }

}

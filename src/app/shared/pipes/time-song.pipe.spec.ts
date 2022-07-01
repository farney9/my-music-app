import { TimeSongPipe } from './time-song.pipe';

describe('TimeSongPipe', () => {

  let pipe : TimeSongPipe;

  beforeEach(()=>{
    pipe = new TimeSongPipe();
  });
  it('create an instance', () => {
    const pipe = new TimeSongPipe();
    expect(pipe).toBeTruthy();
  });
  it('use transform', ()=>{
    const time = 210240;
    const timeFormated = pipe.transform(time);

    expect(timeFormated).toBe("03:30");
  })
});

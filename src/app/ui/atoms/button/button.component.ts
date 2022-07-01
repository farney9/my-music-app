import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {

  public nameButton: string = '';
  public classButton: string = '';

  @Input() set name(nameButton: string) {
    this.nameButton = nameButton;
  }

  @Input() set class(classButton: string) {
    this.classButton = classButton;
  }

  @Output() clickButtonEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public clickButton(){
    this.clickButtonEvent.emit(this.nameButton);
  }

}

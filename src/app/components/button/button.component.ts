import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  
})
export class ButtonComponent implements OnInit {

  @Input() label: any
  @Input() color: any
  @Input() disabled: any

  constructor() { }

  ngOnInit(): void {
  }
// ok
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-doc-text',
  templateUrl: './doc-text.component.html'
})
export class DocTextComponent implements OnInit {
  // @ts-ignore
  @Input() control: FormControl;
  @Input() fieldName: string = '';
  @Input() type: string = '';
  @Input() hint: string = '';
  @Input() fun: Function = () => {};
  // @ts-ignore
  @Input() maxLength: number;

  constructor() {}

  ngOnInit(): void {}
}

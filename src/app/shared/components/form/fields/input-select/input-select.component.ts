import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent implements OnInit {
  // @ts-ignore
  @Input() control: FormControl;
  // @ts-ignore
  @Input() fieldName: string;
  @Input() data: any;
  @Input()  routerLink!: string;
  // @ts-ignore
  @Input() selectedValue: string;
  // @ts-ignore
  @Input() viewedValue: string;
   // @ts-ignore
  @Input() RequestLabel: boolean=false;
  @Input() degreeLabel: boolean=false;
  @Input() prosecutionLabel: boolean=false;
  @Input() offerLabel : boolean =false
  @Input() chooseLabel : boolean =false
  @Input() tripLabel: boolean=false;
  @Input() govLabel: boolean=false;
  @Input() cityLabel: boolean=false;
  @Input() muqarLabel: boolean=false;
  @Input() option: boolean=false;
  @Output() searchEvent = new EventEmitter<string>();
  // @ts-ignore
  compareFu = (a, b): boolean => a?.id === b?.id;
  constructor() {}

  ngOnInit(): void {}

  search(){
    this.searchEvent.emit()
  }

}

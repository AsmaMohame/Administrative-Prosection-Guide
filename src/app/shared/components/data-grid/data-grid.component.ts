import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Column } from './column';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataGridComponent<T> implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChild(TemplateRef) templateRef!: TemplateRef<unknown>;

  @Input() data: T[] = [];
  @Input() displayedColumns!: string[];
  @Input() displayedList!: string[];
  @Input() columns: Column[] = [];
  @Input() totalRows = 0;
  @Input() page = 0;
  @Output() deleteRecord: EventEmitter<T> = new EventEmitter<T>();
  @Output() fetchRecord: EventEmitter<T> = new EventEmitter<T>();
  @Output() loadData: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  dataSource!: MatTableDataSource<T>;
  size: number = 10;
  @Input() isVisible: boolean = true;


  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<T>(this.data);
  }
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'عدد العناصر في الصفحه';
      this.dataSource.paginator = this.paginator;
  }



  pageChanged(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.loadData.emit(event);
  }


}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMuqarComponent } from './add-edit-muqar.component';

describe('AddEditMuqarComponent', () => {
  let component: AddEditMuqarComponent;
  let fixture: ComponentFixture<AddEditMuqarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMuqarComponent]
    });
    fixture = TestBed.createComponent(AddEditMuqarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

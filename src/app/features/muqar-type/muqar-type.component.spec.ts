import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuqarTypeComponent } from './muqar-type.component';

describe('MuqarTypeComponent', () => {
  let component: MuqarTypeComponent;
  let fixture: ComponentFixture<MuqarTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuqarTypeComponent]
    });
    fixture = TestBed.createComponent(MuqarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

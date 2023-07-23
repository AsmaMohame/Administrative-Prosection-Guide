import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuqarComponent } from './muqar.component';

describe('MuqarComponent', () => {
  let component: MuqarComponent;
  let fixture: ComponentFixture<MuqarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuqarComponent]
    });
    fixture = TestBed.createComponent(MuqarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

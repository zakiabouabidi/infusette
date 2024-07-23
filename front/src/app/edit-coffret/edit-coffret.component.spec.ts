import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoffretComponent } from './edit-coffret.component';

describe('EditCoffretComponent', () => {
  let component: EditCoffretComponent;
  let fixture: ComponentFixture<EditCoffretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCoffretComponent]
    });
    fixture = TestBed.createComponent(EditCoffretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

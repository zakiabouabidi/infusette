import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffretComponent } from './coffret.component';

describe('CoffretComponent', () => {
  let component: CoffretComponent;
  let fixture: ComponentFixture<CoffretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoffretComponent]
    });
    fixture = TestBed.createComponent(CoffretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

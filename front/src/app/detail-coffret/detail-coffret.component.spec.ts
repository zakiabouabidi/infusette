import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCoffretComponent } from './detail-coffret.component';

describe('DetailCoffretComponent', () => {
  let component: DetailCoffretComponent;
  let fixture: ComponentFixture<DetailCoffretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCoffretComponent]
    });
    fixture = TestBed.createComponent(DetailCoffretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

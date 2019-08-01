import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartbtnComponent } from './cartbtn.component';

describe('CartbtnComponent', () => {
  let component: CartbtnComponent;
  let fixture: ComponentFixture<CartbtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartbtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

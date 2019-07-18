import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfaqComponent } from './userfaq.component';

describe('UserfaqComponent', () => {
  let component: UserfaqComponent;
  let fixture: ComponentFixture<UserfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

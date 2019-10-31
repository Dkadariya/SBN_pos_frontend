import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventComponent } from './list-invent.component';

describe('ListInventComponent', () => {
  let component: ListInventComponent;
  let fixture: ComponentFixture<ListInventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

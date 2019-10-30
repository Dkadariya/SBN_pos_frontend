import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventMgmtComponent } from './invent-mgmt.component';

describe('InventMgmtComponent', () => {
  let component: InventMgmtComponent;
  let fixture: ComponentFixture<InventMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

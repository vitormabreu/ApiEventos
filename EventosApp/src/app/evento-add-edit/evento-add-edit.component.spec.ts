import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAddEditComponent } from './evento-add-edit.component';

describe('EventoAddEditComponent', () => {
  let component: EventoAddEditComponent;
  let fixture: ComponentFixture<EventoAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

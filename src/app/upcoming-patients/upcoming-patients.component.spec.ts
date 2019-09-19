import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPatientsComponent } from './upcoming-patients.component';

describe('UpcomingPatientsComponent', () => {
  let component: UpcomingPatientsComponent;
  let fixture: ComponentFixture<UpcomingPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

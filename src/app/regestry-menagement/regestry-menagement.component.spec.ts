import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegestryMenagementComponent } from './regestry-menagement.component';

describe('RegestryMenagementComponent', () => {
  let component: RegestryMenagementComponent;
  let fixture: ComponentFixture<RegestryMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegestryMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegestryMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

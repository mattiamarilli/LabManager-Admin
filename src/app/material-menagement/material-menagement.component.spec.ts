import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMenagementComponent } from './material-menagement.component';

describe('MaterialMenagementComponent', () => {
  let component: MaterialMenagementComponent;
  let fixture: ComponentFixture<MaterialMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

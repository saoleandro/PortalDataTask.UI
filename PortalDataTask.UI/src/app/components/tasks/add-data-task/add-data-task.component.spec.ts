import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataTaskComponent } from './add-data-task.component';

describe('AddDataTaskComponent', () => {
  let component: AddDataTaskComponent;
  let fixture: ComponentFixture<AddDataTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDataTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

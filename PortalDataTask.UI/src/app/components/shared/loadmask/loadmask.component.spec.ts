import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadmaskComponent } from './loadmask.component';

describe('LoadmaskComponent', () => {
  let component: LoadmaskComponent;
  let fixture: ComponentFixture<LoadmaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadmaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadmaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

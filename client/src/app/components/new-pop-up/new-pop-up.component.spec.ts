import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPopUpComponent } from './new-pop-up.component';

describe('NewPopUpComponent', () => {
  let component: NewPopUpComponent;
  let fixture: ComponentFixture<NewPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

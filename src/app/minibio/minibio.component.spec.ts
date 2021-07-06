/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinibioComponent } from './minibio.component';

describe('MinibioComponent', () => {
  let component: MinibioComponent;
  let fixture: ComponentFixture<MinibioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinibioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinibioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

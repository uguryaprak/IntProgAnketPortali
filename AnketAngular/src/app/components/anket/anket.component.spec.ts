/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnketComponent } from './anket.component';

describe('AnketComponent', () => {
  let component: AnketComponent;
  let fixture: ComponentFixture<AnketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

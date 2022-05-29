/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnketCozComponent } from './anketCoz.component';

describe('AnketCozComponent', () => {
  let component: AnketCozComponent;
  let fixture: ComponentFixture<AnketCozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketCozComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketCozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

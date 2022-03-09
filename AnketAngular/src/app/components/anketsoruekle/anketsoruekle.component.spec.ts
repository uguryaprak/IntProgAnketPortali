/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnketsoruekleComponent } from './anketsoruekle.component';

describe('AnketsoruekleComponent', () => {
  let component: AnketsoruekleComponent;
  let fixture: ComponentFixture<AnketsoruekleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketsoruekleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketsoruekleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

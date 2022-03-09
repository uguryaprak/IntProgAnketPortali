/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KonularComponent } from './konular.component';

describe('KonularComponent', () => {
  let component: KonularComponent;
  let fixture: ComponentFixture<KonularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

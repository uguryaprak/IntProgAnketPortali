/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IstatistikComponent } from './istatistik.component';

describe('IstatistikComponent', () => {
  let component: IstatistikComponent;
  let fixture: ComponentFixture<IstatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

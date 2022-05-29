/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnketistatistikComponent } from './anketistatistik.component';

describe('AnketistatistikComponent', () => {
  let component: AnketistatistikComponent;
  let fixture: ComponentFixture<AnketistatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnketistatistikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketistatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

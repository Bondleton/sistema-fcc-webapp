import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMateriasScreenComponent } from './registro-materias-screen.component';

describe('RegistroMateriasScreenComponent', () => {
  let component: RegistroMateriasScreenComponent;
  let fixture: ComponentFixture<RegistroMateriasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMateriasScreenComponent]
    });
    fixture = TestBed.createComponent(RegistroMateriasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

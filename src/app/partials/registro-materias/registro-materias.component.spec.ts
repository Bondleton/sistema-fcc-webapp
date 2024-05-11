import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMateriasComponent } from './registro-materias.component';

describe('RegistroMateriasComponent', () => {
  let component: RegistroMateriasComponent;
  let fixture: ComponentFixture<RegistroMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMateriasComponent]
    });
    fixture = TestBed.createComponent(RegistroMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasScreenComponent } from './materias-screen.component';

describe('MateriasScreenComponent', () => {
  let component: MateriasScreenComponent;
  let fixture: ComponentFixture<MateriasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriasScreenComponent]
    });
    fixture = TestBed.createComponent(MateriasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

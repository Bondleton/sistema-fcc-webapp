import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUserModalComponent } from './editar-user-modal.component';

describe('EditarUserModalComponent', () => {
  let component: EditarUserModalComponent;
  let fixture: ComponentFixture<EditarUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUserModalComponent]
    });
    fixture = TestBed.createComponent(EditarUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

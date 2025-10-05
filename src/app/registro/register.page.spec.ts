import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page'; // 👈 cambia RegistroPage por RegisterPage

describe('RegisterPage', () => { // 👈 también aquí
  let component: RegisterPage; // 👈 cambia RegistroPage por RegisterPage
  let fixture: ComponentFixture<RegisterPage>; // 👈 cambia RegistroPage por RegisterPage

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPage ] // 👈 cambia RegistroPage por RegisterPage
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

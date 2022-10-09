import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationSigninComponent } from './authentication-signin.component';

describe('AuthenticationSigninComponent', () => {
  let component: AuthenticationSigninComponent;
  let fixture: ComponentFixture<AuthenticationSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

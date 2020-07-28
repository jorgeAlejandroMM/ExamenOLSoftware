import { TestBed } from '@angular/core/testing';

import { SeguridadSesionGuard } from './seguridad-sesion.guard';

describe('SeguridadSesionGuard', () => {
  let guard: SeguridadSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionItems } from './gestion-items';

describe('GestionItems', () => {
  let component: GestionItems;
  let fixture: ComponentFixture<GestionItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

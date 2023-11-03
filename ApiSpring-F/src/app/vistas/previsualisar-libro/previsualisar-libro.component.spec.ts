import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualisarLibroComponent } from './previsualisar-libro.component';

describe('PrevisualisarLibroComponent', () => {
  let component: PrevisualisarLibroComponent;
  let fixture: ComponentFixture<PrevisualisarLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevisualisarLibroComponent]
    });
    fixture = TestBed.createComponent(PrevisualisarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

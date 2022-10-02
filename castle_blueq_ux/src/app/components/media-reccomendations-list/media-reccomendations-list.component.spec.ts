import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaReccomendationsListComponent } from './media-reccomendations-list.component';

describe('MediaReccomendationsListComponent', () => {
  let component: MediaReccomendationsListComponent;
  let fixture: ComponentFixture<MediaReccomendationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaReccomendationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaReccomendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

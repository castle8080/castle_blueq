import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaRecommendationsListComponent } from './media-recommendations-list.component';

describe('MediaRecommendationsListComponent', () => {
  let component: MediaRecommendationsListComponent;
  let fixture: ComponentFixture<MediaRecommendationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaRecommendationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaRecommendationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

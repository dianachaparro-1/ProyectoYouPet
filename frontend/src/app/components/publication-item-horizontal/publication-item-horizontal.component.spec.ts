import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationItemHorizontalComponent } from './publication-item-horizontal.component';

describe('PublicationItemHorizontalComponent', () => {
  let component: PublicationItemHorizontalComponent;
  let fixture: ComponentFixture<PublicationItemHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationItemHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationItemHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

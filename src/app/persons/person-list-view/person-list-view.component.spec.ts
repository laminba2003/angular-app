import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListViewComponent } from './person-list-view.component';

describe('PersonListViewComponent', () => {
  let component: PersonListViewComponent;
  let fixture: ComponentFixture<PersonListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

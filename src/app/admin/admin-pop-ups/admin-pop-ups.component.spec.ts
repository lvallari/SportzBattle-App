import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPopUpsComponent } from './admin-pop-ups.component';

describe('AdminPopUpsComponent', () => {
  let component: AdminPopUpsComponent;
  let fixture: ComponentFixture<AdminPopUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPopUpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPopUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

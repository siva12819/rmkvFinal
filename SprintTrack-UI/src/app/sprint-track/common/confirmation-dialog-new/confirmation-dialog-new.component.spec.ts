import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogNewComponent } from './confirmation-dialog-new.component';

describe('ConfirmationDialogNewComponent', () => {
  let component: ConfirmationDialogNewComponent;
  let fixture: ComponentFixture<ConfirmationDialogNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

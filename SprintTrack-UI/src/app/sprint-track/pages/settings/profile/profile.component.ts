import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { result } from 'lodash';

@Component({
  selector: 'app-profile',
  imports: [SharedModule, CommonModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  profileFrom: FormGroup<any>;
  receivedData: any;
  isview: any;
  focusFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private _matDialog: MatDialog,
    public _confirmationDialog: ConfirmationDialogNewComponent,

  ) { }

  ngOnInit() {
    debugger
    this.profileFrom = this.CreateProfile();
    this.receivedData = history.state.data;
    this.isview = history.state.isview;

    if (this.receivedData !== undefined && this.receivedData !== null) {
      this.profileFrom.patchValue(this.receivedData);
    }
    if (this.isview == false) {
      this.profileFrom.disable();
    }
    setTimeout(() => {
      let userNameInput = document.getElementById('userName') as HTMLInputElement;
      if (userNameInput) {
        userNameInput.focus();
      }
    })
  }

  private CreateProfile(): FormGroup {
    return this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_role: ['Select', Validators.required],
      user_password: ['', [Validators.required, Validators.minLength(8)]],
      user_notification: ['Email', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.beforeSaveValidation()) {
      const formData = this.profileFrom.value;
      console.log('Formatted Profile Form Data:', formData);
      this.saveProfile(formData);
    } else {
      console.log('Profile validation failed. Cannot submit the form.');
    }
  }

  saveProfile(data: any) {
    debugger
    let obj = {
      SaveProfile: JSON.stringify([data])
    };
    this.ticketService.saveProfile(obj).subscribe(
      (response) => {
        console.log('Profile saved successfully', response);
        this._confirmationDialog.openAlertDialog('Profile saved successfully', "Profile Entry")
        this.router.navigate(['./settings/profileslist']);
      });
    (error) => {
      console.error('Error saving profile:', error);
    }
  }




  public beforeSaveValidation(): boolean {
    if (this.profileFrom.get('user_name')?.value.trim() === '') {
      document.getElementById('userName').focus();
      this._confirmationDialog.openAlertDialog("Enter user name", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_name')?.value.length < 5) {
      document.getElementById('userEmail').focus();
      this._confirmationDialog.openAlertDialog("Enter user email", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_name')?.value.length > 50) {
      document.getElementById('userEmail').focus();
      this._confirmationDialog.openAlertDialog("User Name cannot exceed 50 characters", "Profile Entry");
      return false;
    }
    if (this.profileFrom.get('user_email')?.value.trim() === '') {
      this._confirmationDialog.openAlertDialog("Enter User Email", "Profile Entry");
      return false;
    } else if (!this.profileFrom.get('user_email')?.valid) {
      this._confirmationDialog.openAlertDialog("Enter a valid Email", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_email')?.value.length < 5) {
      this._confirmationDialog.openAlertDialog("Email must be at least 5 characters", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_email')?.value.length > 50) {
      this._confirmationDialog.openAlertDialog("Email cannot exceed 100 characters", "Profile Entry");
      return false;
    }
    if (this.profileFrom.get('user_role')?.value === 'Select') {
      this._confirmationDialog.openAlertDialog("Select a User Role", "Profile Entry");
      return false;
    }
    if (this.profileFrom.get('user_password')?.value.trim() === '') {
      this._confirmationDialog.openAlertDialog("Enter User Password", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_password')?.value.length < 8) {
      this._confirmationDialog.openAlertDialog("Password must be at least 8 characters", "Profile Entry");
      return false;
    } else if (this.profileFrom.get('user_password')?.value.length > 20) {
      this._confirmationDialog.openAlertDialog("Password cannot exceed 20 characters", "Profile Entry");
      return false;
    }
    if (this.profileFrom.get('user_notification')?.value === '') {
      this._confirmationDialog.openAlertDialog("Select Notification Method", "Profile Entry");
      return false;
    }

    return true;
  }

  public onClear(exitFlag: boolean): void {
    if (this.profileFrom.dirty) {
      this.openAlertDialog(
        exitFlag ? 'Changes will be lost. Are you sure?' : 'Do you want to clear the fields?',
        exitFlag
      );
    } else if (exitFlag) {
      this.onListClick();
    }
  }

  public onListClick(): void {
    this.profileFrom.reset();
    this.router.navigate(['/settings/profileslist']);
  }
  private resetForm(): void {
    this.profileFrom.reset();
      this.profileFrom.patchValue({
    user_notification: 'Email',
    user_role:'Select'
  
  });
  }

  clearForm(): void {
    const dialogRef = this._matDialog.open(ConfirmationDialogNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the action, so clear the form
        this.profileFrom.reset({
          username: '',
          useremail: '',
          userrole: '',
          Notification: '',
          userpassword: ''
        });
      }
    });
  }

  onExit() {
    this.router.navigate(['/settings/profileslist']);
  }


  private openAlertDialog(message: string, exitFlag?: boolean): void {
    debugger
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = "Profile";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (exitFlag) {
          this.onListClick();
        } else {
          this.resetForm();
        }
      }
      dialogRef = null;
    });
  }
}













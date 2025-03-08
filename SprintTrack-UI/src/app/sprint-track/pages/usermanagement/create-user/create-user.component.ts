import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { result } from 'lodash';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})

export default class CreateUserComponent implements OnInit{
  roll: any[] = [{ 'name': "Admin" }, { 'name': "Manager" }]
  receivedData: any;
  isview: boolean = false;
  filteredUserList: any[];
  userList: any = []
  showPassword = false;
  userForm: FormGroup<any>;
  userdata: any;
  Header : string = 'Add ';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public _matDialog: MatDialog,
    private route: ActivatedRoute,
    private _commonService: CommonService,
    private ticketService: TicketService,
    private _confirmationDialog: ConfirmationDialogNewComponent
  ) { }
  

  ngOnInit() {
    this.receivedData = history.state.data;
    this.isview = history.state.isview;
    console.log('Received data:', this.receivedData);
    this.userForm = this.createForm();
    if (this.receivedData !== undefined && this.receivedData !== null) {
      this.userForm.patchValue(this.receivedData);
    }
    if (this.isview == false) {
      this.userForm.disable()
    }
    setTimeout(() => {
      const userSearchInput = document.getElementById('user_name') as HTMLInputElement;
      if (userSearchInput) {
        userSearchInput.focus();
      }
    });
    if(history.state.header != '' && history.state.header != null ){
      this.Header = history.state.header;
    }
  }

  // onClear(): void {
  //   if (this.userForm.dirty) {
  //     this.openAlertDialog("Do you want to clear the form?", "sprintName").subscribe((result: boolean) => {
  //       if (result) {
  //         this.userForm.reset();
  //          this.userForm.patchValue({ user_roll: 'Active' });
  //       }
  //     });
  //   } else {
  //     this.userForm.reset();
  //   }
  // }
  
  public onClear(exitFlag: boolean): void {
    if (this.userForm.dirty) {
      const message = exitFlag 
        ? 'Changes will be lost. Are you sure?' 
        : 'Do you want to clear the fields?';
        
      console.log('Showing confirmation dialog with message:', message); // Debugging log
  
      // Open the dialog with the message and exitFlag
      this.openAlertDialog(message, exitFlag);
    } else if (exitFlag) {
      console.log('No changes made, navigating to list.'); // Debugging log
      this.onListClick();
    }
  }
  
  
  private openConfirmationDialogs(message: string, exitFlag?: boolean): void {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: { confirmationDialog: 1 }
    });

    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = 'User Form';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        exitFlag ? this.onListClick() : this.resetForm();
      }
    });
  }

  private resetForm(): void {
    this.userForm.reset();
  }

  public onListClick(): void {
    this.userForm.reset();  
    this.router.navigate(['usermanagement/userslist']);
  }


  private createForm(): FormGroup {
    return this.fb.group({
      user_id: [''],
      user_name: ['', Validators.required],
      user_role: ['', Validators.required],
      user_email: [
        '', 
        [
          Validators.required, 
          Validators.email,  // Angular's built-in email validator
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)  // Custom regex to validate basic email structure
        ]
      ],
      password: ['', Validators.required],
      status: ['1', Validators.required],
    });
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onSubmit(): void {
    if (this.beforeSaveValidation()) {
      console.log(this.userForm.value);

      const formData = this.userForm.value;
      this.saveUser(formData);
    } else {
      console.log('Profile validation failed. Cannot submit the form.');
    }
  }

  public beforeSaveValidation(): boolean {
    debugger
    if (this.userForm.get('user_name')?.value === '') {
      document.getElementById('user_name').focus();
      this._confirmationDialog.openAlertDialog("Enter Name", "user_name");
      return false;
    } 
    if (this.userForm.get('user_role')?.value === '') {
      document.getElementById('userrole').focus();
      this._confirmationDialog.openAlertDialog("Select Role", "userrole");
      return false;
    } 
    if (this.userForm.get('user_email')?.value === '') {
      document.getElementById('useremail').focus();
      this._confirmationDialog.openAlertDialog("Enter E Mail", "useremail");
      return false;
    } else if (!this.userForm.get('user_email')?.valid) {
      document.getElementById('useremail').focus();
      this._confirmationDialog.openAlertDialog("Enter a valid Email", "useremail");
      return false;
    } 
    if (this.userForm.get('password')?.value === '') {
      document.getElementById('password').focus();
      this._confirmationDialog.openAlertDialog("Enter Password", "password");
      return false;
    } else if (this.userForm.get('password')?.value.length < 8) {
      document.getElementById('password').focus();
      this._confirmationDialog.openAlertDialog("Password must be at least 8 characters", "userPassword");
      return false;
    }
    return true;
  }

  private openAlertDialog(message: string, exitFlag?: boolean): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = "User";
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

  saveUser(data: any) {
    let isUpdate = data.user_id ? true : false;
    let obj = {
      SaveUser: JSON.stringify([data])
    }
    this.ticketService.saveUser(obj).subscribe(
      (response) => {
        if (isUpdate) {
          this._confirmationDialog.openAlertDialog("user updated successfully", data.user_name); 
        } else {
          this._confirmationDialog.openAlertDialog("user saved successfully", data.user_name); 
        }
        this.router.navigate(['/usermanagement/userslist']);
      },
      (error) => {
        console.error('Error saving/updating user:', error);
        this.openAlertDialog(isUpdate ? "Error updating user" : "Error saving user", data.user_name);
      }
    );
  }

  public selectInputValue(): void {
    const estimatedInput = document.getElementById('estimated') as HTMLInputElement;
    if (estimatedInput) {
      estimatedInput.focus();
      estimatedInput.select();
    }
  }

  onExit(): void {
      // If no unsaved changes, just navigate
      this.router.navigate(['/usermanagement/userslist']);
    
  }
}
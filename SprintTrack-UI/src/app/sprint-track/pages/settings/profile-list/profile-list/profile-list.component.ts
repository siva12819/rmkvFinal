import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ProfileComponent } from '../../profile/profile.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';
import { ExcelService } from 'src/app/theme/shared/directive/excel-service';


@Component({
  selector: 'app-profile-list',
  imports: [SharedModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
  providers:[DatePipe]
})
export class ProfileListComponent implements OnInit {

  ProfileList: any = [];
  FilteredProfileList: any = [];
  searchString: string = '';
  sendProfile: any;
  flag: boolean = false;


  constructor(
    private router: Router,
    private ticketService: TicketService,
    public _matDialog: MatDialog,
    public _confirmationDialog: ConfirmationDialogNewComponent,
    public _datePipe:DatePipe,
    public _excelService:ExcelService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const profileSearchInput = document.getElementById('searchBar') as HTMLInputElement;
      if (profileSearchInput) {
        profileSearchInput.focus();
      }
    });
    
    this.loadProfile();
  }

  addProfile() {
    this.router.navigate(['/settings/profiles']);
  }

  loadProfile() {
    this.ticketService.getProfile().subscribe(Profile => {
      this.ProfileList = Profile;
      this.FilteredProfileList = Profile;
    });
  }

  searchItem(): void {
    debugger
    if (this.searchString) {
      this.FilteredProfileList = this.ProfileList.filter(data =>
        data.user_name.toLowerCase().includes(this.searchString.toLowerCase()) ||
        data.user_email.toLowerCase().includes(this.searchString.toLowerCase())
      );
    }
    else {
      this.FilteredProfileList = this.ProfileList;
    }
  }

  editprofile(Profile: any, isview: boolean) {
    debugger
    this.sendProfile = Profile;
    this.router.navigate(['/settings/profiles'], { state: { data: this.sendProfile, isview: isview } });
  }
  deleteProfile(i: any) {
    debugger;
    if (this.ProfileList && this.ProfileList.length > i) {
      let obj = {
        SaveProfile: JSON.stringify([{
          profile_id: this.ProfileList[i].profile_id
        }])
      };
      this.ticketService.saveProfile(obj).subscribe(
        (response) => {
          console.log('Profile deleted successfully:', response);
          window.alert('Profile deleted successfully!');
        },
        (error) => {
          console.error('Error deleting profile:', error);
          window.alert('Error deleting profile!');
        }
      );
      this.loadProfile();
    } else {
      console.error('Error delete Sprinty.');
      window.alert('Error delete profile.');
    }
  }

  onExit(): void {
    this.router.navigate(['/dashboard']);
  }

  public onClickActive(i): any {
    let _dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    _dialogRef.componentInstance.confirmMessage =
    "Do you want to activate this row";
    _dialogRef.componentInstance.componentName = "Profile List";
    return _dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.onClickActiveProfile(i);
      _dialogRef = null;
    });
  }

  onClickActiveProfile(i: any) {
    debugger
    let objApprove = {
      ProfileActive: JSON.stringify([{
        profile_id: this.FilteredProfileList[i].profile_id,
        active: true,
      }])
    }
    this.ticketService.activeProfile(objApprove).subscribe((result: any) => {
      if (result) {
        this.loadProfile();
        this._confirmationDialog.openAlertDialog('Active successfully', 'Profile');
      }
    });
  }

  public onClickDeactivate(i): any {
    let _dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    _dialogRef.componentInstance.confirmMessage =
    "Do you want to deactive this row";
    _dialogRef.componentInstance.componentName = "Profile List";
    return _dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.onClickDeactiveProfile(i);
      _dialogRef = null;
    });
  }

  onClickDeactiveProfile(i: any) {
    debugger
    let objApprove = {
      ProfileActive: JSON.stringify([{
        profile_id: this.FilteredProfileList[i].profile_id,
        active: false,
      }])
    }
    this.ticketService.activeProfile(objApprove).subscribe((result: any) => {
      if (result) {
        this.FilteredProfileList[i].active = false;
        this.loadProfile();
        this.openAlertDialog('Deactive successfully', 'Profile');
      }
    });
  }

  private openAlertDialog(message: string, elementId: string): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = "profileslist";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        document.getElementById(elementId)?.focus();
    });
  }

  public exportToExcel(): void {
    if (this.ProfileList.length > 0) {
      this.flag = true;
      setTimeout(() => {
        let datetime = this._datePipe.transform(new Date(), "dd-MM-yyyy hh:mm:a");
        this._excelService.exportAsExcelTableRecord('exportTable', 'week_Of_Work_Approval', datetime);
        this.flag = false;
      }, 100);
    } else
      this._confirmationDialog.openAlertDialogWithTimeout("No record found , Load the data first", "Week Of Work Approval");
  }

}

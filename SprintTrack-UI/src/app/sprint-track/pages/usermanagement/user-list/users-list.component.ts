import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [CommonService, TicketService]
})

export default class UsersListComponent {
  sendUser: any;
  user: any;
  userList: any = [];
  searchString: string = "";
  dataSource: any = new MatTableDataSource([]);
  filteredUserList: any = [];

  constructor(
    private router: Router,
    private _commonSerivice: CommonService,
    private ticketService: TicketService,
     public _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    debugger
    setTimeout(() => {
      const userSearchInput = document.getElementById('searchBar') as HTMLInputElement;
      if (userSearchInput) {
        userSearchInput.focus();
      }
    });
    this.loadUsers();
  }

  addUser() {
    this.router.navigate(['/usermanagement/createusers']);
  }

  editUser(user: any, isview: boolean) {
    debugger
    this.sendUser = user;
    let header :string;
    if(isview == false){
      header = 'View ';
    }
    else
      header = 'Edit ';

    this.router.navigate(['/usermanagement/createusers'], { state: { data: this.sendUser, isview: isview , header :header } });
  }

  // editUser(user: any, isview: boolean) {
  //   debugger
  //   this.sendUser = user;
  //   this.router.navigate(['/usermanagement/createusers'], { state: { data: this.sendUser, isview: isview } });
  // }

  onClickActiveUser(i: any) {
    let objApprove = {
      userActive: JSON.stringify([{
        user_id: this.filteredUserList[i].user_id,
        active: true,
      }])
    }
    this.ticketService.activeUser(objApprove).subscribe((result: any) => {
      if (result) {
        this.loadUsers();
        this.openAlertDialog('Active successfully', 'user');
      }
    });
  }

  onClickDeactiveUser(i: any) {
    let objApprove = {
      userActive: JSON.stringify([{
        user_id: this.filteredUserList[i].user_id,
        active: false,
      }])
    }
    this.ticketService.activeUser(objApprove).subscribe((result: any) => {
      if (result) {
        this.loadUsers();
        this.openAlertDialog('DeActive successfully', 'user');
      }
    });
  }

  private openAlertDialog(message: string, elementId: string): Observable<boolean> {
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = "User Entry";
    return dialogRef.afterClosed();
  }

  // loadUsers() {
  //   this.ticketService.getUsers().subscribe(users => {
  //     this.userList = users;
  //     this.filteredUserList  = this.userList;
  //   });
  // }

  loadUsers() {
    this.ticketService.getUsers().subscribe(users => {
      if (users) {
        this.userList = users;
        this.filteredUserList = users;
      } else {
        this.openAlertDialog("No record founds", "title");
      }
    });
  }


  onClear(exit: boolean): void {
    if (exit) {
      this.router.navigate(['/dashboard']);  // Adjust the path as needed
    }
  }

  deleteUser(index: number): void {
    this.userList.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.userList);
  }

  searchItem(): void {
               
    if (this.searchString) {
      this.filteredUserList = this.userList.filter(data =>
        data.user_name.toLowerCase().includes(this.searchString.toLowerCase()) ||
        data.user_role.toLowerCase().includes(this.searchString.toLowerCase()) ||
        data.user_email.toLowerCase().includes(this.searchString.toLowerCase()) ||
        (data.user_id && data.user_id.toString().toLowerCase().includes(this.searchString.toLowerCase()))
      );
    } 
    else {
      this.filteredUserList = this.userList;
    }
  }
  
}

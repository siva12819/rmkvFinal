import { HeaderRowOutlet } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { head } from 'lodash';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { SprintService } from 'src/app/sprint-track/services/sprint.service';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sprint-list.component.html',
  styleUrl: './sprint-list.component.scss',
  providers: [CommonService, SprintService]
})
export default class SprintListComponent {

  searchString: string = '';
  sendSprint: any;
  SprintList: any = [];
  filteredSprintList: any = [];

  constructor(
    private router: Router,
    private sprintService: SprintService,
    public _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    debugger
    setTimeout(() => {
      let sprintSearchInput = document.getElementById('searchBar') as HTMLInputElement;
      if (sprintSearchInput) {
        sprintSearchInput.focus();
      }
    });
    this.loadSprint();
  }

  filterSprints(): void {
    if (this.searchString) {    
      this.filteredSprintList = this.SprintList.filter(sprint =>
        sprint.sprint_name.toLowerCase().includes(this.searchString.toLowerCase()) 
        // sprint.start_date.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.end_date.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.sprint_goal.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.sprint_status.toLowerCase().includes(this.searchString.toLowerCase())
      );
    } else {
      this.filteredSprintList = this.SprintList;
    }
  }

  addSprint() {
    this.router.navigate(['/sprint/createsprint']);
  }

  editSprint(sprint: any, isview: boolean) {
    debugger
    this.sendSprint = sprint;
    let header :string;
    if(isview == false){
      header = 'View ';
    }
    else
      header = 'Edit ';

    this.router.navigate(['/sprint/createsprint'], { state: { data: this.sendSprint, isview: isview , header :header } });
  }

  loadSprint() {
    this.sprintService.getSprint().subscribe(result => {
      if (result) {
        this.SprintList = result;
        this.filteredSprintList = result;
      }
      else {
        this.openAlertDialog("No record found", "List")
      }
    });
  }

  private openAlertDialog(message: string, elementId: string): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = "Sprint List";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        document.getElementById(elementId)?.focus();
    });
  }

  deleteSprint(i: any) {
    debugger
    let obj = {
      saveSprint: JSON.stringify([{
        sprint_id: this.SprintList[i].sprint_id
      }])
    }
    this.sprintService.saveSprint(obj).subscribe(
      (response) => {
        console.log('Sprint delete successfully:', response);
        this.openAlertDialog("Sprint delete successfully", "sprintName")
      }
      // (error) => {
      //   console.error('Error delete Sprint:', error);
      //   this.openAlertDialog("Error delete Sprint", "sprintName")
      // }
    );
    this.loadSprint();
  }

  onExit(): void {
    this.router.navigate(['/dashboard']);
  }

}





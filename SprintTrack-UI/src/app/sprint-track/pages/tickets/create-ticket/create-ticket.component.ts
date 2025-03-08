import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { FileAttachmentComponent } from 'src/app/sprint-track/common/file-attachment/file-attachment.component';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { SprintService } from 'src/app/sprint-track/services/sprint.service';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss',
})
export default class CreateTicketComponent implements OnInit {

  ticketTypes: any[] = ['Bug', 'Feature', 'Task', 'Improvement'];
  priorities: any[] = ['Low', 'Medium', 'High', 'Critical'];
  statuses: any[] = [
    { "id": 1, "name": "New" },
    { "id": 2, "name": "In Progress" },
    { "id": 3, "name": "Resolved" },
    { "id": 4, "name": "Closed" },
    { "id": 4, "name": "Open" }
  ];


  teamMembers: any = [];
  sprints: any = [];
  tags: any[] = [];
  selectedFiles: FileList | null = null;
  ticketForm: FormGroup<any>;



  receivedData: any;
  isview: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commonSerivice: CommonService,
    private ticketService: TicketService,
    public _matDialog: MatDialog,
    private sprintService: SprintService,
    private _confirmationDialog: ConfirmationDialogNewComponent,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadUsers();
    setTimeout(() => {
      const sprintNameInput = document.getElementById('title') as HTMLInputElement;
      if (sprintNameInput) {
        sprintNameInput.focus();
      }
    });
    this.receivedData = history.state.data;
    this.isview = history.state.isview;
    console.log('Received data:', this.receivedData);
    this.ticketForm = this.createForm();
    if (this.receivedData !== undefined && this.receivedData !== null) {
      this.ticketForm.patchValue(this.receivedData);
    }
    if (this.isview == false) {
      this.ticketForm.disable()
      // this.ticketForm.patchValue(this.receivedData);
    }
  }

  loadSprint() {
    this.sprintService.getSprint().subscribe(sprints => {
      this.sprints = sprints;
    });
  }


  loadUsers() {
    this.ticketService.getUsers().subscribe(users => {
      this.teamMembers = users;
    });
    this.loadSprint();
  }




  private createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      sprint: ['', Validators.required],
      status: ['', Validators.required],
      estimated: [0, [Validators.required, Validators.min(0)]],
      file_path: []
    });
  }
  public onClear(exitFlag: boolean): void {
    if (this.ticketForm.dirty) {
      this.openAlertDialog(
        exitFlag ? 'Changes will be lost. Are you sure?' : 'Do you want to clear the fields?',
        exitFlag
      );
    } else if (exitFlag) {
      this.onListClick();
    }
  }



  private openAlertDialog(message: string, exitFlag?: boolean): void {
    debugger
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = "Create Ticket";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (exitFlag) {
          this.onListClick();
        } else { this.resetForm(); }
      }
      dialogRef = null;
    });
  }

  public onListClick(): void {
    this.ticketForm.reset();
    this.router.navigate(['/tickets/ticketlist']);
  }

  private resetForm(): void {
    this.ticketForm.reset();
  }

  clearForm(): void {
    const dialogRef = this._matDialog.open(ConfirmationDialogNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the action, so clear the form
        this.ticketForm.reset({
          id: '',
          title: '',
          description: '',
          type: '',
          priority: '',
          assignee: '',
          sprint: '',
          status: '',
          estimated: 0
        });
      }
    });
  }


  onSubmit(): void {
    if (this.beforeSaveValidation()) {
      const formData = this.ticketForm.value;
      this.saveTicket(formData);

      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.uploadFiles(this.selectedFiles);
      } else {
        console.log('No files selected for upload');
      }
    }
  }

  saveTicket(data: any) {
    let obj = {
      saveTicket: JSON.stringify([data])
    }
    this.ticketService.saveTicket(obj).subscribe(
      (response) => {
        this._confirmationDialog.openAlertDialog('Create Ticket successfully', "Create Ticket")
        this.router.navigate(['/tickets/ticketlist'])
      },
      (error) => {
        console.error('Error saving ticket:', error);

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

  public beforeSaveValidation(): boolean {
    if (this.ticketForm.get('title').value.toString().trim() === '') {
      document.getElementById('title').focus();
      this._confirmationDialog.openAlertDialog("Enter title", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('description').value === '') {
      document.getElementById('description').focus();
      this._confirmationDialog.openAlertDialog("Enter description", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('type').value === '') {
      document.getElementById('type').focus();
      this._confirmationDialog.openAlertDialog("Select type", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('priority').value === '') {
      document.getElementById('priority').focus();
      this._confirmationDialog.openAlertDialog("Select priority", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('status').value === '') {
      document.getElementById('statuses').focus();
      this._confirmationDialog.openAlertDialog("Select status", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('assignee').value === '') {
      document.getElementById('assignee').focus();
      this._confirmationDialog.openAlertDialog("Select assignee", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('sprint').value === '') {
      document.getElementById('sprint').focus();
      this._confirmationDialog.openAlertDialog("Select sprint", "Ticket Entry");
      return false;
    } if (this.ticketForm.get('estimated').value < 0) {
      document.getElementById('estimated').focus();
      this._confirmationDialog.openAlertDialog("Enter estimated time (hours)", "Ticket Entry");
      return false;
    } return true;
  }


  onExit() {
    this.router.navigate(['/tickets/ticketlist']);
  }


  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      console.log('Selected files:', this.selectedFiles);
      this.ticketForm.patchValue({
        file_path: this.selectedFiles[0].name
      });
    }
  }

  uploadFiles(files: FileList): void {
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    const formData = new FormData();
    const ticketData = {
      title: this.ticketForm.get('title').value,
      description: this.ticketForm.get('description').value,
      type: this.ticketForm.get('type').value,
      priority: this.ticketForm.get('priority').value,
      status: this.ticketForm.get('status').value,
      assignee: this.ticketForm.get('assignee').value,
      sprint: this.ticketForm.get('sprint').value,
      estimated: this.ticketForm.get('estimated').value
    };

    formData.append('ticketData', JSON.stringify(ticketData));
    formData.append('file', files[0]);

    this.http.post('http://localhost:55046/MonthlyStatement/SaveTicket', formData)
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.selectedFiles = null;
          this.ticketForm.patchValue({
            file_path: null
          });
        },
        error: (error) => {
          console.error('Upload failed', error);
        }
      });
  }


  onclickview(): void {
    let dialogRef = this._matDialog.open(FileAttachmentComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result && result.file && result.file.length > 0) {
        this.selectedFiles = result.selectedFiles;
        this.ticketForm.get('file_path')?.setValue(result.files[0].name);
        console.log(`Selected file: ${result.files[0].name}`);
      }
    });
  }

}



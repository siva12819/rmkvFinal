import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { SprintService } from 'src/app/sprint-track/services/sprint.service';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

let MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-create-sprint',
  standalone: true,
  imports: [SharedModule, MatDatepickerModule],
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, DatePipe],
})
export default class CreateSprintComponent {

  sprintTypes: string[] = ['Bug', 'Feature', 'Task', 'Improvement'];
  receivedData: any;
  sprintForm: FormGroup;
  isDisabled = true;
  isview = false;
  minEndDate: Date | null = null
  minStartDate: Date | null = null;
  teamMembers: any = [];
  Header : string = 'Add ';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private sprintService: SprintService,
    private dateAdapter: DateAdapter<any>,
    private datePipe: DatePipe,
    public _matDialog: MatDialog,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.sprintForm = this.createForm();
    this.sprintForm.get('start_date')?.valueChanges.subscribe((startDate) => {
      if (startDate) {
        this.minEndDate = new Date(startDate);
        this.sprintForm.get('end_date')?.updateValueAndValidity();
      }
    });
    this.sprintForm.get('end_date')?.valueChanges.subscribe((endDate) => {
      if (endDate) {
        this.minStartDate = new Date(endDate);
      } else {
        this.minStartDate = null;
      }
    });
    debugger
    setTimeout(() => {
      let sprintNameInput = document.getElementById('sprintName') as HTMLInputElement;
      if (sprintNameInput) {
        sprintNameInput.focus();
      }
    });
    this.receivedData = history.state.data;
    this.isview = history.state.isview;
    if (this.receivedData !== undefined && this.receivedData !== null) {
      this.sprintForm.patchValue(this.receivedData);
    }
    if (this.isview == false) {
      this.sprintForm.disable();
    }
    this.dateAdapter.setLocale('en-GB');
    if(history.state.header != '' && history.state.header != null ){
      this.Header = history.state.header;
    }
  }

  private createForm(): FormGroup {
    let currentDate = new Date();
    let endDate = new Date(currentDate);
    return this.fb.group({
      sprint_id: [''],
      sprint_name: ['', Validators.required],
      start_date: [currentDate, [Validators.required, this.validateStartDate.bind(this)]],
      end_date: [endDate, [Validators.required, this.validateEndDate.bind(this)]],
      sprint_status: ['Active', Validators.required],
      sprint_goal: ['', Validators.required],
    });
  }

  validateEndDate(control: any) {
    let startDate = this.sprintForm?.get('start_date')?.value;
    if (startDate && control.value && new Date(control.value) < new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }

  validateStartDate(control: any) {
    let endDate = this.sprintForm?.get('end_date')?.value;
    if (endDate && control.value && new Date(control.value) > new Date(endDate)) {
      return { invalidStartDate: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.beforeSaveValidation()) {
      let formData = this.sprintForm.value;
      formData.start_date = this.datePipe.transform(formData.start_date, 'dd/MM/yyyy');
      formData.end_date = this.datePipe.transform(formData.end_date, 'dd/MM/yyyy');

      console.log('Formatted Form Data:', formData);
      this.saveSprint(formData);
    }
  }
  
  saveSprint(data: any): void {
    let isUpdate = data.sprint_id ? true : false;
    let obj = {
      saveSprint: JSON.stringify([data])
    };
    this.sprintService.saveSprint(obj).subscribe(
      (response) => {
        if (isUpdate) {
          this.openAlertDialog("Sprint updated successfully", data.sprintName); 
        } else {
          this.openAlertDialog("Sprint saved successfully", data.sprintName); 
        }
        this.router.navigate(['/sprint/sprintlist']);
      },
      (error) => {
        console.error('Error saving/updating Sprint:', error);
        this.openAlertDialog(isUpdate ? "Error updating sprint" : "Error saving sprint", data.sprintName);
      }
    );
  }

  public beforeSaveValidation(): boolean {
    const currentDate = new Date(); // Declare currentDate here
    currentDate.setHours(0, 0, 0, 0); 
    if (this.sprintForm.get('sprint_name')?.value === '') {
      this.openAlertDialog("Enter Sprint Name", "sprintName")
      return false;
    }if (this.sprintForm.get('sprint_goal')?.value === '') {
      this.openAlertDialog("Enter Sprint Goal", "sprintGoal")
      return false;
    }if (this.sprintForm.get('start_date')?.value === '') {
      this.openAlertDialog("Enter Start Date", "advancedateStart")
      return false;
    }let endDate = this.sprintForm.get('end_date')?.value;
    if (endDate === '') {
      this.openAlertDialog("Enter End Date", "advancedateEnd");
      return false;
    } else {
      const endDateObj = new Date(endDate);
      endDateObj.setHours(0, 0, 0, 0);
      if (endDateObj < currentDate) {
        this.openAlertDialog("End Date must be greater than or equal to the current date.", "advancedateEnd");
        return false;
      }
    }return true;
  }

  private openAlertDialog(message: string, elementId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = this.Header + "Sprint Entry";
    dialogRef.afterClosed().subscribe(result => {
      resolve(result);
      if (result) {
        let element = document.getElementById(elementId);
        if (element) {
          element.focus();
        }
      }
    });
  });
  }

  async onExit(): Promise<void> {
    if (this.sprintForm.dirty || (this.sprintForm.invalid && !this.sprintForm.pristine)) {
      let result = await this.openAlertDialog("Do you want to exit without saving?", "sprintName");
      if (result) {
        this.router.navigate(['/sprint/sprintlist']);
      }
    } else {
      this.router.navigate(['/sprint/sprintlist']);
    }
  }
  
  async onClear(): Promise<void> {
    if (this.sprintForm.dirty) {
      let result = await this.openAlertDialog("Do you want to clear the form?", "sprintName");
      if (result) {
        this.sprintForm.reset();
        this.sprintForm.patchValue({ sprint_status: 'Active' });
        this.sprintForm.patchValue({ start_date: new Date(), end_date: new Date() });
      }
    } else {
      this.sprintForm.reset();
      this.sprintForm.patchValue({ sprint_status: 'Active' });
      this.sprintForm.patchValue({ start_date: new Date(), end_date: new Date() });
    }
  }

  loadUsers() {
    this.sprintService.getSprint().subscribe(users => {
      this.teamMembers = users;
    });
  }

onFileSelected(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0]; // Get selected file
    this.uploadFile(file);
  }
}

uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file); // Append the file to FormData

  this.http.post('http://localhost:55046/MonthlyStatement/UploadFile', formData).subscribe(
    (response) => {
      console.log('File uploaded successfully', response);
    },
    (error) => {
      console.error('Error uploading file', error);
    }
  );
}

}


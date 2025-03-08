import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/theme/shared/directive/local-storage.service';
import { CommonService } from '../../services/common.service';
import { ConfirmationDialogNewComponent } from '../confirmation-dialog-new/confirmation-dialog-new.component';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-file-attachment',
  standalone: false,
  // imports: [MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './file-attachment.component.html',
  styleUrl: './file-attachment.component.scss',
})

export class FileAttachmentComponent {
  objAttachView = {
    file_path1: '',
    file_path2: '',
    file_path3: '',
    file_path4: ''
  }
  objAction: any = {
    isEditing: false
  }
  isCancelled: boolean = false;
  attachment: any = [
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 1"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 2"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 3"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 4"
    }
  ]
  unchangedattachment: any = [
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 1"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 2"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 3"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 4"
    }
  ]

  selectedFiles: File[] | any[] = [];
  fileIndex: number[] = [];
  removedfilesIndex: number[] = [];
  removedFiles: any[] = [];

  document1: any;
  document4: any;
  document3: any;
  document2: any;
  tempFile4: any;
  tempFile3: any;
  tempFile2: any;
  tempFile1: any;
  oldDocument4: any;
  oldDocument3: any;
  oldDocument2: any;
  oldDocument1: any;

  @ViewChild('fileInput') fileInput: ElementRef | any;
  @ViewChild('docInput1') docInput1: ElementRef | any;
  @ViewChild('docInput2') docInput2: ElementRef | any;
  @ViewChild('docInput3') docInput3: ElementRef | any;
  @ViewChild('docInput4') docInput4: ElementRef | any;

  constructor(
    public _dialogRef: MatDialogRef<FileAttachmentComponent>,
    private _confirmationDialog: ConfirmationDialogNewComponent,
    private _commonService: TicketService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _localStorage: LocalStorageService,
  ) {
    this._dialogRef.disableClose = true;
    console.log(_data.view == true,'_data.view == true')
  }

  ngOnInit() {
    debugger;
    this.objAttachView = JSON.parse(this._data.objAttach);
    if (this.objAttachView.file_path1) {
      this.attachment[0].Progress = 100;
      this.oldDocument1 = this.objAttachView.file_path1;
      this.objAttachView.file_path1 = [null, 'null', undefined, 'undefined', NaN, 'NaN', ''].indexOf(this.objAttachView.file_path1) === -1 ? this.objAttachView.file_path1 : "";
    } if (this.objAttachView.file_path2) {
      this.attachment[1].Progress = 100;
      this.oldDocument2 = this.objAttachView.file_path2;
      this.objAttachView.file_path2 = [null, 'null', undefined, 'undefined', NaN, 'NaN', ''].indexOf(this.objAttachView.file_path2) === -1 ? this.objAttachView.file_path2 : "";
    } if (this.objAttachView.file_path3) {
      this.attachment[2].Progress = 100;
      this.oldDocument3 = this.objAttachView.file_path3;
      this.objAttachView.file_path3 = [null, 'null', undefined, 'undefined', NaN, 'NaN', ''].indexOf(this.objAttachView.file_path3) === -1 ? this.objAttachView.file_path3 : "";
    } if (this.objAttachView.file_path4) {
      this.attachment[3].Progress = 100;
      this.oldDocument4 = this.objAttachView.file_path4;
      this.objAttachView.file_path4 = [null, 'null', undefined, 'undefined', NaN, 'NaN', ''].indexOf(this.objAttachView.file_path4) === -1 ? this.objAttachView.file_path4 : "";
    }
  }

  public uploadDocument(event: any, i: number): void {
    debugger;
    let fileToUpload = event.target.files[0] as any;
    for (let k = 0; k < this.selectedFiles.length; k++) {
      let checkFile = this.selectedFiles[k];
      if (checkFile.name === fileToUpload.name) {
        this._confirmationDialog.openAlertDialog('File already selected', 'Attach File');
        this['docInput' + (i + 1)].nativeElement.value = '';
        return;
      }
    }
    this.attachment[i].Progress = 100;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('fileRootPath', this._localStorage.getHRDocumentPath());
    this._commonService.uploadTempFile(formData).subscribe(
      (result: any) => {
        debugger;
        // if (i == 0) {
        let filePath = 'objAttachView.file_path' + (i + 1);
        this['tempFile' + (i + 1)] = result.document_Path;
        if (event.target.length != 0) {
          this.fileIndex.push(i);
          this.selectedFiles.push(event.target.files[0]);
          this['document' + (i + 1)] = event.target.files;
        } else {
          this.fileInput[i].nativeElement.files = this['document' + (i + 1)];
          this.selectedFiles.push(this['document' + (i + 1)][0]);
        }
        this[filePath] = "";
      });
  }

  public removeTempDocument(i: number): void {
    const formData = new FormData();
    debugger;
    let tempFile = 'tempFile' + (i + 1);
    formData.append('fileRootPath', this._localStorage.getHRDocumentPath());
    // if (i === 0) {
    formData.append('oldDocument', this[tempFile]);
    // console.log(this.fileIndex.indexOf(i), 'File Index');
    this.fileIndex.splice(this.fileIndex.indexOf(i), 1);
    this.selectedFiles.splice(this.document1, 1);
    this._commonService.uploadTempFile(formData).subscribe((result: any) => {
      debugger;
      if (!result.document_Path) {
        this.attachment[i].Progress = 0;
        this['document' + (i + 1)] = null;
        this['tempFile' + (i + 1)] = null;
        this['docInput' + (i + 1)].nativeElement.value = '';
      }
    });
  }

  public onClear(): void {
    if (this.selectedFiles.length > 0) {
      let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
        panelClass: "custom-dialog-container",
        data: { confirmationDialog: 1 }
      });
      dialogRef.componentInstance.confirmMessage = "Are you sure? You wish to cancel";
      dialogRef.componentInstance.componentName = "Attach File";

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.selectedFiles = [];
          this._dialogRef.close();
        }
      });
    } else {
      this._dialogRef.close();
    }
  }

  private onConfirmation(): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage =
      "Are you sure? You wish to save";
    dialogRef.componentInstance.componentName = "Attach File";

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        let objAttach = {
          isFileAttach: 1,
          myFiles: this.selectedFiles
        }
        this._dialogRef.close(objAttach);
      } else {
        this._dialogRef.close(null);
      }
    });
  }

  public openRemoveTempFileConfirmationDialog(i: number): void {
    debugger;
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure, want to remove this file?";
    dialogRef.componentInstance.componentName = "Attach File";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.removeTempDocument(i);
      }
    });
  }

  public openRemoveFileConfirmationDialog(i: number): void {
    debugger;
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure, want to remove this file?";
    dialogRef.componentInstance.componentName = "Attach File";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.removeUploadedDocuments(i);
      }
    });
  }

  private removeUploadedDocuments(index: number): void {
    debugger;
    if (index == 0) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument1
      });
      this.removedfilesIndex.push(index);
      this.oldDocument1 = null;
      this.objAttachView.file_path1 = '';
      this.document1 = null;
      this.tempFile1 = null;
      this.attachment[0].Progress = 0;
    } else if (index == 1) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument2
      });
      this.removedfilesIndex.push(index);
      this.oldDocument2 = null;
      this.objAttachView.file_path2 = '';
      this.document2 = null;
      this.tempFile2 = null;
      this.attachment[1].Progress = 0;
    } else if (index == 2) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument3
      });
      this.removedfilesIndex.push(index);
      this.oldDocument3 = null;
      this.objAttachView.file_path3 = '';
      this.document3 = null;
      this.tempFile3 = null;
      this.attachment[2].Progress = 0;
    } else if (index == 3) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument4
      });
      this.removedfilesIndex.push(index);
      this.oldDocument4 = null;
      this.objAttachView.file_path4 = '';
      this.document4 = null;
      this.tempFile4 = null;
      this.attachment[3].Progress = 0;
    }
  }

  public addFileAttachment(): void {
    debugger;
      this.onUploadDocuments();
  }

  public onUploadDocuments(): void {
    debugger;
    let docSize: number = 0;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      docSize += this.selectedFiles[i].size;
    }
    if (docSize > +this._localStorage.getHRDocumentSize()) {
      this._confirmationDialog.openAlertDialog("Maximum size for all files can't be greater than 15MB", 'Attach Files');
      return;
    }
    let objAttach: any = {
      isFileAttach: 1,
      selectedFiles: this.selectedFiles,
      fileIndex: this.fileIndex,
      objAttachView: this.objAttachView,
      removedFiles: this.removedFiles,
      removedFileIndex: this.removedfilesIndex
    };
    this._dialogRef.close(objAttach);
  }

}

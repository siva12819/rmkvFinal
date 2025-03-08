import { Compiler, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { LocalStorageService } from 'src/app/theme/shared/directive/local-storage.service';
import { LauncherService } from 'src/app/theme/shared/service/launcher.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,FormsModule ],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {
  model: any = {
    User_Name: "",
    Password: "",
  };

  unChangedModel: any = {
    User_Name: "",
    Password: "",
  };
  hide: boolean = true;

  constructor(
    private _router: Router,
    private _launcherService: LauncherService,
    private _localStorage: LocalStorageService,
    public _matDialog: MatDialog, private _compiler: Compiler,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._compiler.clearCache();
  }
  ngOnInit() {
    this._localStorage.setApiUrl('https://localhost:44369/')
    this._compiler.clearCache();
  }

  private validateUserNameAndPassword(): boolean {
    if ([null, undefined, ""].indexOf(this.model.User_Name) !== -1 || !this.model.User_Name.toString().trim()) {
      this.openAlertDialog("Enter User Name", "usr");
      return false;
    } else if ([null, undefined, ""].indexOf(this.model.Password) !== -1 || !this.model.Password.toString().trim()) {
      this.openAlertDialog("Enter Password", "pwd");
      return false;
    } else {
      return true;
    }
  }

  public onlyAllowAlphanumeric(event: KeyboardEvent | any): boolean {
    const pattern = /^[a-zA-Z0-9-/]*$/;
    if (!pattern.test(event.key)) {
      return false;
    } else
      return true;
  }

  public login(): void {
    debugger;
    if (this.validateUserNameAndPassword()) {
      let user = {
        username: this.model.User_Name.toString().trim(),
        password: this.model.Password.toString().trim(),
      }
      this._launcherService.login(user).subscribe((result: any) => {
        debugger;
        if (result) {
          console.log(result);
          localStorage.setItem('authToken', result.jwtToken);
           this._router.navigate(["dashboard"]);
        }
      }, err => {
         this.openAlertDialog(err.error, "usr");
        console.log(err.error, 'error');
      });
    }
  }

  public clearUsers(event: KeyboardEvent | any): void {
    debugger;
    if (event.keyCode === 8 || event.keyCode === 46) {
      debugger;
      let userName = this.model.User_Name;
      this.model = JSON.parse(JSON.stringify(this.unChangedModel));
      this.model.User_Name = userName;
    }
  }

  public inputTextFocus(): void {
    document.getElementById('pwd')?.focus();
  }

  private openAlertDialog(message: string, elementId?: string): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogNewComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = "Login";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        document.getElementById(elementId).focus();
      dialogRef = null;
    });
  }

}

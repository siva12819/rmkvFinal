import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogNewComponent } from 'src/app/sprint-track/common/confirmation-dialog-new/confirmation-dialog-new.component';
import { CommonService } from 'src/app/sprint-track/services/common.service';
import { TicketService } from 'src/app/sprint-track/services/ticket.service';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';
import { DateValidation } from 'src/app/theme/shared/directive/DatePickerValidation';
import { LocalStorageService } from 'src/app/theme/shared/directive/local-storage.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
  providers: [CommonService, TicketService, DatePipe, ConfirmationDialogComponent]
})
export default class TicketListComponent {

  objLoad: any = {
    from_date: this._datePipe.transform(new Date(), 'dd/MM/yyyy'),
    to_date: this._datePipe.transform(new Date(), 'dd/MM/yyyy')
  }

  public dateValidation: DateValidation = new DateValidation();
  sendTicket: any;
  fromDate1: any = new Date();
  toDate1: any = new Date();
  TicketList: any = [];
  minDate: string = this._localStorage.getMinDate();
  maxDate: any = this._datePipe.transform(new Date(), 'dd/MM/yyyy');
  minimumDate = new Date(+this._localStorage.getMinDate().split("/")[2], +this._localStorage.getMinDate().split("/")[1], +this._localStorage.getMinDate().split("/")[0]);
  maximumDate = new Date();
  searchString: string = '';
  filteredTicketList: any = [];
  constructor(
    private router: Router,
    private commonService: CommonService,
    private ticketService: TicketService,
    public _datePipe: DatePipe,
    public _localStorage: LocalStorageService,
    public _matDialog: MatDialog,
    public _confirmationDialogComponent: ConfirmationDialogNewComponent
  ) { }

  ngOnInit() {
    debugger
    this.loadTickets();
    setTimeout(() => {
      let ticketSearchInput = document.getElementById('ticketsearch') as HTMLInputElement;
      if (ticketSearchInput) {
        ticketSearchInput.focus();
      }
    });
  }


  filterSprints(): void {
    if (this.searchString) {
      this.filteredTicketList = this.TicketList.filter(ticket =>
        ticket.title.toLowerCase().includes(this.searchString.toLowerCase())
        // sprint.start_date.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.end_date.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.sprint_goal.toLowerCase().includes(this.searchString.toLowerCase()) ||
        // sprint.sprint_status.toLowerCase().includes(this.searchString.toLowerCase())
      );
    } else {
      this.filteredTicketList = this.TicketList;
    }
  }

  public validateFromDate(): void {
    debugger;
    let date = this.dateValidation.validateDate(this.objLoad.from_date, this.fromDate1, this.minDate, this.maxDate);
    this.objLoad.from_date = date[0];
    this.fromDate1 = date[1];
  }
  public validateToDate(): void {
    let date = this.dateValidation.validateDate(this.objLoad.to_date, this.toDate1, this._datePipe.transform(this.fromDate1, 'dd/MM/yyyy'), this.maxDate);
    this.objLoad.to_date = date[0];
    this.toDate1 = date[1];
  }

  addTicket() {
    this.router.navigate(['/tickets/createticket']);
  }

  editTicket(ticket: any, isview: boolean) {
    debugger
    this.sendTicket = ticket;
    this.router.navigate(['/tickets/createticket'], { state: { data: this.sendTicket, isview: isview } });
  }


  loadTickets() {
    this.ticketService.getTickets().subscribe(tickets => {
      if (tickets) {
        this.TicketList = tickets;
      } else {
        this._confirmationDialogComponent.openAlertDialog('No record found', 'Ticket List')
      }
    });
  }

  private openAlertDialog(message: string, elementId: string): void {
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    dialogRef.componentInstance.alertMessage = message;
    dialogRef.componentInstance.componentName = "Ticket List";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        document.getElementById(elementId)?.focus();
      // dialogRef = null;
    });
  }

  deleteTicket(i: any) {
    debugger
    let obj = {
      saveTicket: JSON.stringify([{
        ticket_id: this.TicketList[i].id
      }])
    }
    this.ticketService.saveTicket(obj).subscribe(
      (response) => {
        this._confirmationDialogComponent.openAlertDialog('Ticket delete successfully', 'Ticket List')

      },

    );
    this.loadTickets();
  }

  onExit(): void {
    this.router.navigate(['/dashboard']);
  }

}

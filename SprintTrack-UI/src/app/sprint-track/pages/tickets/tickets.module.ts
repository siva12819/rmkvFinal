import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ConfirmationDialogComponent } from 'src/app/theme/shared/components/confirmationdialog/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, TicketsRoutingModule,ConfirmationDialogComponent]
})
export class TicketsModule {}

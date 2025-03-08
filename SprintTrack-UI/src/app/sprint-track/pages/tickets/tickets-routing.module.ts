import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import CreateTicketComponent from './create-ticket/create-ticket.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ticketlist',
        loadComponent: () => import('./ticket-list/ticket-list.component')
      },
      {
        path: 'createticket',
        component:CreateTicketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sprintlist',
        loadComponent: () => import('./sprint-list/sprint-list.component')
      },
      {
        path: 'createsprint',
        loadComponent: () => import('./create-sprint/create-sprint.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule {}

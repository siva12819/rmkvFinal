import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profileslist',
        loadComponent: () => import('./profile-list/profile-list/profile-list.component').then(m => m.ProfileListComponent)
      },
      {
        path: 'profiles',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
      //   {
      //     path: 'createsprint',
      //     loadComponent: () => import('./create-sprint/create-sprint.component')
      //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

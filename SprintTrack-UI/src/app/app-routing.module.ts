import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import AuthSigninComponent from './sprint-track/pages/authentication/auth-signin/auth-signin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './sprint-track/pages/authentication/guards/auth.guard';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'auth', 
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: GuestComponent,
    children: [
      {
        path: '',
        component: AuthSigninComponent
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./sprint-track/dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./sprint-track/pages/tickets/tickets.module').then((m) => m.TicketsModule)
      },
      {
        path: 'sprint',
        loadChildren: () => import('./sprint-track/pages/sprint/sprint.module').then((m) => m.SprintModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./sprint-track/pages/settings/settings.module').then((m) => m.SettingsModule)
      },
      {
        path: 'apexchart',
        loadComponent: () => import('./sprint-track/pages/core-chart/apex-chart/apex-chart.component')
      },
      {
        path: 'usermanagement',
        loadChildren: () => import('./sprint-track/pages/usermanagement/users.module').then((m) => m.UsersModule)
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

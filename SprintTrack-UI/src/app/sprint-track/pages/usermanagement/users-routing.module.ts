import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import UsersListComponent from './user-list/users-list.component';
import CreateUserComponent from './create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userslist',
        component:UsersListComponent
      },
     {
        path: 'createusers',
        component:CreateUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

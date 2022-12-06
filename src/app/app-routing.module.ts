import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
	{
		path: 'add-user',
		component: AddUserComponent
	},
	{
		path: 'user-list',
		component: UserListComponent
	},
	{
		path: '**',
		redirectTo: 'user-list'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

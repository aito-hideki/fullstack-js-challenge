import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { RoleGuard } from 'src/app/guards/role-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

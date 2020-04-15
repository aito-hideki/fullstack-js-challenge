import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPollsComponent } from './user-polls.component';
import { RoleGuard } from 'src/app/guards/role-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserPollsComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPollsRoutingModule { }

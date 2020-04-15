import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollsComponent } from './polls.component';
import { RoleGuard } from 'src/app/guards/role-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PollsComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule { }

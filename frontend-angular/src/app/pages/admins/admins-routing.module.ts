import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsComponent } from './admins.component';
import { RoleGuard } from 'src/app/guards/role-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AdminsComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }

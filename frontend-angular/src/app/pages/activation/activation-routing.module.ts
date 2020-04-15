import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from './activation.component';
import { RoleGuard } from 'src/app/guards/role-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ActivationComponent, canActivate: [RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }

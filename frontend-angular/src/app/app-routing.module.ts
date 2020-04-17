import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { UsersComponent } from './pages/users/users.component';
import { PollsComponent } from './pages/polls/polls.component';
import { UserPollsComponent } from './pages/user-polls/user-polls.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { RoleGuard } from './guards/role-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admins', component: AdminsComponent, canActivate: [RoleGuard] },
  { path: 'users', component: UsersComponent, canActivate: [RoleGuard] },
  { path: 'polls', component: PollsComponent, canActivate: [RoleGuard] },
  { path: 'user-polls', component: UserPollsComponent, canActivate: [RoleGuard], data: { isAdmin: false } },
  { path: 'activation', component: ActivationComponent, canActivate: [RoleGuard], data: { isLogged: false } },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

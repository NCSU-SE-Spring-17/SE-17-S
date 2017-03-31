import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { TeamsComponent } from './teams/teams.component';
import { ProfileComponent } from './profile/profile.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthService] },
    { path: 'teams', component: TeamsComponent, canActivate: [AuthService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthService]}

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

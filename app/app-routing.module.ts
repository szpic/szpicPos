import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/main', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
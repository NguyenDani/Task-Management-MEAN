import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TodoComponent } from './todo/todo.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component:AuthComponent },
    { path: 'dashboard', component:TodoComponent, canActivate: [authGuard] },
    { path: '*', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

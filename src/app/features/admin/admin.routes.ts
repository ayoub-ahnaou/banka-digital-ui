import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../core/layout/admin-layout-component/admin-layout-component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            },
            {
                path: "dashboard",
                component: AdminDashboardComponent
            },
            {
                path: "users",
                loadComponent: () => import('./users/users-list.component').then(m => m.UsersListComponent)
            }
        ]
    },
];

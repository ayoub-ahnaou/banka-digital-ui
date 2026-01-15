import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './core/layout/auth-layout-component/auth.layout.component';
import {MainLayoutComponent} from './core/layout/main-layout-component/main.layout.component';
import {NotFound} from './shared/components/not-found/not.found';

export const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadChildren: () => import("./features/auth/auth.route")
          .then((m) => m.AUTH_ROUTES)
      },
      {
        path: "register",
        loadChildren: () => import("./features/auth/register.route")
          .then((m) => m.REGISTER_ROUTES)
      }
    ]
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./features/dashboard/dashboard.route")
          .then((m) => m.DASHBOARD_ROUTES)
      },
      {
        path: "not-found",
        component: NotFound
      },
      {
        path: "operations",
        loadChildren: () => import("./features/operation/operations.route")
          .then((m) => m.OPERATIONS_ROUTES)
      }
    ]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

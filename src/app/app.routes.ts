import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./features/auth/auth.route")
      .then((m) => m.AUTH_ROUTES)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./features/dashboard/dashboard.route")
      .then((m) => m.DASHBOARD_ROUTES)
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  }
];

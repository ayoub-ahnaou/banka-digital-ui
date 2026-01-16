import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './core/layout/auth-layout-component/auth.layout.component';
import {MainLayoutComponent} from './core/layout/main-layout-component/main.layout.component';
import {NotFound} from './shared/components/not-found/not.found';
import {ClientGuard} from './core/guards/client.guard';
import {BankAgentGuard} from './core/guards/bank.agent.guard';
import {AdminGuard} from './core/guards/admin.guard';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    // GUEST ROUTES
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

  // CLIENT ROUTES
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard, ClientGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./features/dashboard/dashboard.route").then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: "operations",
        loadChildren: () =>
          import("./features/operation/operations.route").then(m => m.OPERATIONS_ROUTES)
      }
    ]
  },

  // BANK AGENT ROUTES
  {
    path: "agent",
    canActivate: [AuthGuard, BankAgentGuard],
    loadChildren: () =>
      import("./features/agent/bank.agent.routes").then(m => m.BANK_AGENT_ROUTES)
  },

  // ADMIN ROUTES
  /*{
    path: "admin",
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import("./features/admin/admin.route")
        .then(m => m.ADMIN_ROUTES)
  },*/

  // OTHER ROUTES
  {
    path: "not-found",
    component: NotFound
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

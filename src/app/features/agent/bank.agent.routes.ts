import { Routes } from '@angular/router';
import { AgentDashboardComponent } from './dashboard/agent-dashboard.component';
import { AgentLayoutComponent } from '../../core/layout/agent-layout-component/agent-layout-component';

export const BANK_AGENT_ROUTES: Routes = [
  {
    path: "",
    component: AgentLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: AgentDashboardComponent
      },
      {
        path: "operations",
        loadComponent: () => import('./operations/agent-operations.component').then(m => m.AgentOperationsComponent)
      }
    ]
  },
];

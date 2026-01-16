import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../../features/admin/components/admin-sidebar/admin-sidebar.component';

@Component({
    selector: 'app-admin-layout-component',
    imports: [
        RouterOutlet, AdminSidebarComponent
    ],
    template: `
    <div class="h-screen flex flex-col">
      <div class="flex flex-1">
        <app-admin-sidebar></app-admin-sidebar>
        <main class="flex-1 bg-gray-50 p-6 max-h-screen overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class AdminLayoutComponent {

}

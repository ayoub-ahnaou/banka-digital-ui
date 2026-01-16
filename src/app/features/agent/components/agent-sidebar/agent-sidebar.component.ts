import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-agent-sidebar',
    imports: [
        RouterLink
    ],
    template: `
    <aside class="w-64 bg-white border-r border-gray-200 min-h-full flex flex-col">

      <div class="p-3 border-b border-gray-200">
        <a [routerLink]='["/agent"]' class="text-lg font-bold">
          Agent Portal <span class="text-blue-500 text-xl">.</span>
        </a>
      </div>

      <nav class="flex-1 mt-4 text-sm">
        <ul>
          <li>
            <a [routerLink]='["/agent"]' class="block p-2 hover:bg-gray-100 border-b border-gray-200">
              Dashboard
            </a>
          </li>
          <li>
            <a [routerLink]='["/agent/operations"]' class="block p-2 hover:bg-gray-100 border-b border-gray-200">
              Operations
            </a>
          </li>
        </ul>
      </nav>

      <div class="border-t border-gray-200 text-sm">
        <ul>
          <li>
            <button (click)="logout()" class="block p-2 w-full text-left rounded hover:bg-gray-100 hover:cursor-pointer">
              Logout
            </button>
          </li>
        </ul>
      </div>

    </aside>
  `
})
export class AgentSidebarComponent {
    constructor(private auth: AuthService, private router: Router) {
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['login']);
    }
}

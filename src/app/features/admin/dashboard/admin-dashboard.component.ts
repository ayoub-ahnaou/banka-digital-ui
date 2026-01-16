import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-dashboard',
    imports: [],
    template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">Total Users</h2>
          <p class="text-3xl font-bold mt-2">10,234</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">Total Operations</h2>
          <p class="text-3xl font-bold mt-2 text-blue-500">45k</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">New Accounts (Today)</h2>
          <p class="text-3xl font-bold mt-2 text-green-500">12</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">System Health</h2>
          <p class="text-3xl font-bold mt-2 text-green-600">99.9%</p>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {

}

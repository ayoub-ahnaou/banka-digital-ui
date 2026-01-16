import { Component } from '@angular/core';

@Component({
    selector: 'app-agent-dashboard',
    imports: [],
    template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Agent Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Summary Cards -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">Total Customers</h2>
          <p class="text-3xl font-bold mt-2">1,234</p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">Pending Requests</h2>
          <p class="text-3xl font-bold mt-2 text-orange-500">5</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 class="text-gray-500 text-sm font-medium">Daily Operations</h2>
          <p class="text-3xl font-bold mt-2 text-green-500">42</p>
        </div>
      </div>
    </div>
  `,
    styles: ``
})
export class AgentDashboardComponent {

}

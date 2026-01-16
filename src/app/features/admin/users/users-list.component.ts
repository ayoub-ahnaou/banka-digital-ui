import {Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user.model';
import {DecimalPipe, NgClass, UpperCasePipe} from '@angular/common';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-users-list',
  imports: [
    UpperCasePipe,
    NgClass,
    DecimalPipe
  ],
  template: `
    <div class="h-full">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">User Management</h2>
      </div>

      @if (loading()) {
        <div class="text-gray-500 text-sm">
          Loading users...
        </div>
      }

      @if (error()) {
        <div class="text-red-600 text-sm">
          {{ error() }}
        </div>
      }

      @if (!loading() && !error() && users().length === 0) {
        <div class="text-gray-500 text-sm bg-gray-50 rounded-lg p-4">
          No users found.
        </div>
      }

      @if (users().length > 0) {
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th class="py-3 px-4">ID</th>
              <th class="py-3 px-4">Username</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Role</th>
              <th class="py-3 px-4">Balance</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (user of users(); track user.id) {
                <tr class="hover:bg-gray-50 transition">
                  <td class="py-3 px-4 font-mono text-xs text-gray-500">{{ user.id }}</td>
                  <td class="py-3 px-4 font-medium text-gray-900">{{ user.username }}</td>
                  <td class="py-3 px-4 text-gray-600">{{ user.email }}</td>

                  <!-- ROLE -->
                  <td class="py-3 px-4">
                     <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                           [ngClass]="{
                        'bg-blue-50 text-blue-700': user.role === 'CLIENT',
                        'bg-purple-50 text-purple-700': user.role === 'ADMIN',
                        'bg-orange-50 text-orange-700': user.role === 'BANK_AGENT'
                     }">
                      {{ user.role.replace('ROLE_', '') | uppercase }}
                    </span>
                  </td>

                  <td class="py-3 px-4 font-medium text-gray-900">{{ user.balance | number:'1.2-2' }} MAD</td>

                  <!-- STATUS -->
                  <td class="py-3 px-4">
                    @if (user.active) {
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                         ACTIVE
                       </span>
                    } @else {
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                         INACTIVE
                       </span>
                    }
                  </td>

                  <!-- ACTIONS -->
                  <td class="py-3 px-4 text-right flex justify-end gap-2">

                    @if (user.role === 'CLIENT') {
                      <button
                        (click)="promoteUser(user)"
                        class="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded hover:bg-orange-100 transition">
                        Promote to Agent
                      </button>
                    }

                    @if (user.active) {
                      <button
                        (click)="deactivateUser(user)"
                        class="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-100 transition">
                        Deactivate
                      </button>
                    } @else {
                      <button
                        (click)="activateUser(user)"
                        class="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded hover:bg-green-100 transition">
                        Activate
                      </button>
                    }

                    <button
                      (click)="deleteUser(user)"
                      class="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded hover:bg-red-100 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        // Filter out admins
        const filtered = data.filter(u => u.role !== 'ADMIN');
        this.users.set(filtered);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete user ${user.username}?`)) return;

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.toastService.showSuccess('User deleted successfully');
        this.loadUsers();
      },
      error: () => {
        this.toastService.showError('Failed to delete user');
      }
    });
  }

  activateUser(user: User) {
    if (!confirm(`Activate user ${user.username}?`)) return;
    this.userService.activateUser(user.id).subscribe({
      next: () => {
        this.toastService.showSuccess('User activated');
        this.loadUsers();
      },
      error: () => this.toastService.showError('Failed to activate user')
    });
  }

  deactivateUser(user: User) {
    if (!confirm(`Deactivate user ${user.username}?`)) return;
    this.userService.deactivateUser(user.id).subscribe({
      next: () => {
        this.toastService.showInfo('User deactivated');
        this.loadUsers();
      },
      error: () => this.toastService.showError('Failed to deactivate user')
    });
  }

  promoteUser(user: User) {
    if (!confirm(`Promote ${user.username} to Agent?`)) return;
    this.userService.promoteUser(user.id).subscribe({
      next: () => {
        this.toastService.showSuccess('User promoted to Agent');
        this.loadUsers();
      },
      error: () => this.toastService.showError('Failed to promote user')
    });
  }
}

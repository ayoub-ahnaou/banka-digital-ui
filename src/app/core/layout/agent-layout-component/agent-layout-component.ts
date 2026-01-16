import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgentSidebarComponent } from '../../../features/agent/components/agent-sidebar/agent-sidebar.component';

@Component({
  selector: 'app-agent-layout-component',
  imports: [
    RouterOutlet, AgentSidebarComponent
  ],
  templateUrl: './agent-layout-component.html',
})
export class AgentLayoutComponent {

}

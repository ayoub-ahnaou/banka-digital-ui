import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-main-layout-component',
  imports: [
    RouterOutlet, Navbar
  ],
  templateUrl: './main.layout.component.html',
})
export class MainLayoutComponent {

}

import {Routes} from '@angular/router';
import {OperationComponent} from './operation/operation.component';
import {authGuard} from '../../core/guards/auth.guard';
import {MakeOperationComponent} from './make-operation/make.operation';

export const OPERATIONS_ROUTES: Routes = [
  {
    path: "",
    component: OperationComponent,
    canActivate: [authGuard],
  },
  {
    path: "new",
    component: MakeOperationComponent,
    canActivate: [authGuard],
  }
];

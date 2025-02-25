import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { MainComponent } from './views/main/main.component';
import { AuthForwardGuard } from './core/auth/auth-forward.guard';
import { PolicyComponent } from './views/policy/policy.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'policy', component: PolicyComponent },
      {
        path: '',
        loadChildren: () =>
          import('./views/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AuthForwardGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/article/arcticle.module').then(
            (m) => m.ArcticleModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

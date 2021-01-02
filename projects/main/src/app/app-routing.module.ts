import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessCanvasPanelComponent } from './modules/business-canvas/business-canvas-panel/business-canvas-panel.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Sets default page.
  // { path: 'login', component: LoginPageComponent, canActivate: [InnerAuthGuard] }, // Only accessible whilst not logged in.
  // { path: 'dashboard', component: PatientDashboardComponent, canActivate: [OuterAuthGuard] }, // Only accessible whilst logged in.
  // { path: 'login', component: LoginPageComponent }, // Only accessible whilst not logged in.
  { path: 'business-canvas', component: BusinessCanvasPanelComponent }, // Only accessible whilst not logged in.
  { path: '', redirectTo: 'business-canvas', pathMatch: 'full' }, // Sets default page @TODO: TEMPORARY WHILST NO AUTH APP.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

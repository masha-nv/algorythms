import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinPathComponent } from './min-path/min-path.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'min-path',
    pathMatch: 'full'
  },
  {
    path: 'min-path',
    component: MinPathComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

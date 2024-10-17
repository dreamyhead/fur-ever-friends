import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DogPageComponent } from './pages/dog-page/dog-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/home',
    pathMatch: 'full',
  },
  {
    path: 'public',
    redirectTo: 'public/home',
    pathMatch: 'full',
  },
  {
    path: 'public/home',
    component: HomePageComponent,
  },
  {
    path: 'public/dog/:id',
    component: DogPageComponent,
  },
  {
    path: 'public/not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/public',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

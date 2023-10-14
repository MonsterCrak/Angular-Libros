import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { LibrosComponent } from './vistas/libros/libros.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent,
children:[
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigation', component: NavigationComponent},
  { path: 'libros', component: LibrosComponent},
]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

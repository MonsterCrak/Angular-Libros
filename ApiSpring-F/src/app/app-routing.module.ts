import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { LibrosComponent } from './vistas/libros/libros.component';
import { LibrospublicadosComponent } from './vistas/librospublicados/librospublicados.component';
import { ListalibrosComponent } from './vistas/listalibros/listalibros.component';
import { RegistrarComponent } from './vistas/registrar/registrar.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { PrevisualisarLibroComponent } from './vistas/previsualisar-libro/previsualisar-libro.component';
import { VerLibroComponent } from './vistas/ver-libro/ver-libro.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent,
children:[
  { path: 'dashboard', component: DashboardComponent },
  { path: 'navigation', component: NavigationComponent},
  { path: 'libros', component: LibrosComponent},
  { path: 'publicaciones', component: LibrospublicadosComponent},
  { path: 'librostabla', component: ListalibrosComponent},
  {path: 'libros/:id', component: LibrosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'ver-previa', component: PrevisualisarLibroComponent},
  {path: 'ver-libro/:id', component: VerLibroComponent}
]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

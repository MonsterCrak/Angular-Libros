import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelos/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  usuario: any = {  
    id: 0,
    nombre: '',
    paterno: '',
    materno: '',
    email: '',
    estado:0,
    clave: ''
  };
 
  constructor(
    private router: Router,
    private services: UsuarioService
  ) { }

  registrarUsuario(usuario: any) {
    this.services.registrarUsuario(usuario).subscribe(
      response => {
        console.log('Usuario registrado correctamente', response);
        if (response && response.mensaje) {
          Swal.fire('¡Registro exitoso!', response.mensaje, 'success');
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.error('Error al registrar usuario', error);
        if (error.error && error.error.mensaje) {
          Swal.fire('Error', error.error.mensaje, 'error');
        }
      }
    );
  }
  
  



}

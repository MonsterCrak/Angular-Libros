import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  usuario: any = {  
    id: 0,
    nombre: '',
    paterno: '',
    materno: '',
    email: '',
    estado:0,
    clave: ''
  };

  request: any = {
    contrasenaActual: "",
    nuevaContrasena: "",
    confirmacionContrasena: ""
  }

  constructor(
    private router: Router,
    private services: UsuarioService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.services.buscarLibro(this.tokenService.getIdUsuario()).subscribe(
      response => {
        console.log(response)
        this.usuario.nombre = response.nombre
        this.usuario.paterno = response.paterno
        this.usuario.materno = response.materno
        this.usuario.email = response.email
        this.usuario.id = this.tokenService.getIdUsuario()
      }
    )
  }

  actualizarUsuario(usuario: any) {
    this.services.actualizarUsuario(usuario).subscribe(
      response => {
        console.log('Usuario registrado correctamente', response);
        if (response && response.mensaje) {
          Swal.fire('Actualización exitosa!', response.mensaje, 'success');
          window.location.reload();
        }
      },
      error => {
        console.error('Error al actualizar', error);
        if (error.error && error.error.mensaje) {
          Swal.fire('Error', error.error.mensaje, 'error');
        }
      }
    );
  }


  cambiarContrasena(id: number, request: any) {
    this.services.cambiarContrasena(this.tokenService.getIdUsuario(), request).subscribe(
      response => {
        Swal.fire({
          title: 'Contraseña actualizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        window.location.reload();
      },
      error => {
        console.error('Error al cambiar contraseña', error);
        Swal.fire({
          title: 'Error al cambiar contraseña',
          text: 'Ocurrió un error al intentar cambiar la contraseña',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }


  buscarUsuario(){
    this.services.buscarLibro(3).subscribe(
      response => {
        console.log(response)
      }
    )
  }

}

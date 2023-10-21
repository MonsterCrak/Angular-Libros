import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genero } from 'src/app/Modelos/Genero';
import { Libro } from 'src/app/Modelos/Libro';
import { GeneroService } from 'src/app/services/genero.service';
import { LibrosService } from 'src/app/services/libros.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  selectedImage: any = null;
  selectedDocument: any = null;

  libro: Libro = {
    id: 0,
    titulo: "",
    descripcion: "",
    autor: "",
    archivo: "",
    portada: "",
    registro: 0,
    estado: false,
    genero: {
      id: 0,
      nombre: ""
    },
    usuario: {
      id: 0
    },
    isLiked: false,
    isFavorite: false
  }


  genero: Genero[] = []

  archivo: File;
  portada: File;


  constructor(private g: GeneroService, private l: LibrosService, private tokenService: TokenService, private router:Router) {

  }



  estado: string[] = ['Activo', 'Inactivo'];

  ngOnInit() {
    this.g.listarGenero().subscribe(x => {
      this.genero = x
      this.libro.usuario.id = this.tokenService.getIdUsuario();
      console.log("Usuario: "+ this.libro.usuario.id);

      console.log(x)
    })
  }

  onFileImage(event: any) {
    this.portada = event.target.files[0];
  }

  onFileDocument(event: any) {
    this.archivo = event.target.files[0];
  }



  mapEstado(estado: string): boolean {
    return estado === 'Activo' ? true : false;
   
  }


  registrar() {
    /*this.libro.titulo = `${this.libro.titulo}`;*/

    let estadoActual = `${this.libro.estado}`;
    this.libro.estado = this.mapEstado(estadoActual);

    console.log(estadoActual);
    console.log(this.libro.estado);
    
    this.l.registrarLibro(this.libro, this.archivo, this.portada)
      .subscribe(
        response => {
          // Éxito al registrar
          console.log(response);
          Swal.fire('¡Registrado correctamente!', '', 'success');
          this.router.navigate(['inicio/librostabla']); 
        },
        error => {
          // Manejar error
          console.error(error);
          Swal.fire('Error al registrar', 'Por favor, inténtalo de nuevo más tarde.', 'error');
        }
      );
  }






}



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  portadaNombre: string;
  archivoNombre: string;

  libro: Libro = {
    id: 0,
    titulo: "",
    descripcion: "",
    autor: "",
    archivo: "",
    portada: "",
    registro: 0,
    estado: null,
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


  constructor(private g: GeneroService, private l: LibrosService, private tokenService: TokenService, private router: Router, private activateRouter: ActivatedRoute) { }

  //recuperando codigo para actualizar
  codigoRecuperado = parseInt(this.activateRouter.snapshot.paramMap.get("id"))


  ngOnInit() {
    this.g.listarGenero().subscribe(x => {
      this.genero = x
      console.log(x)
      this.activateRouter.params.subscribe(params => {
        const codigoLibro = params['id'];
        if (codigoLibro) {
          this.buscarLibro();
        }
      });
    })


  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files[0];
  
    if (inputElement.name === 'archivo') {
      this.archivo = file;
    } else if (inputElement.name === 'portada') {
      this.portada = file;
    }
  }
  


  buscarLibro(){
    this.l.buscarLibro(this.codigoRecuperado).subscribe(Response => {
      console.log(Response)
      this.libro.id = Response.id; 
      this.libro.titulo = Response.titulo
      this.libro.autor = Response.autor
      this.libro.genero.id = Response.genero.id
      this.libro.descripcion = Response.descripcion
      this.libro.estado = Response.estado
      this.libro.usuario.id = this.tokenService.getIdUsuario();

      this.libro.archivo = Response.archivo
      this.libro.portada = Response.portada

      this.portadaNombre = this.libro.portada?.split('/').pop();
      this.archivoNombre = this.libro.archivo?.split('/').pop();


      console.log(this.tokenService.getIdUsuario());

      

    })
  }

 

  onFileImage(event: any) {
    this.portada = event.target.files[0];
    this.portadaNombre = this.portada?.name;

  }

  onFileDocument(event: any) {
    this.archivo = event.target.files[0];
    this.archivoNombre = this.archivo?.name;
  }


  registrar() {
    let estadoActual = this.libro.estado ? 'Activo' : 'Inactivo';
    this.libro.usuario.id = this.tokenService.getIdUsuario();

    console.log(estadoActual);

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


  actualizar() {
  let estadoActual = this.libro.estado ? 'Activo' : 'Inactivo';


  if (this.archivo && this.portada) {
    this.l.actualizarLibro(this.libro, this.archivo, this.portada).subscribe(
      response => {
        // Éxito al actualizar
        console.log(response);
        Swal.fire('¡Actualizado correctamente!', '', 'success');
        this.router.navigate(['inicio/librostabla']);
      },
      error => {
        // Manejar error
        console.error(error);
        Swal.fire('Error al actualizar', 'Por favor, inténtalo de nuevo más tarde.', 'error');
      }
    );
  } else {
    this.l.actualizarLibro(this.libro, null, null).subscribe(
      response => {
        // Éxito al actualizar
        console.log(response);
        Swal.fire('¡Actualizado correctamente!', '', 'success');
        this.router.navigate(['inicio/librostabla']);
      },
      error => {
        // Manejar error
        console.error(error);
        Swal.fire('Error al actualizar', 'Por favor, inténtalo de nuevo más tarde.', 'error');
      }
    );
  }
}




registrarOActualizar() {

  if (this.libro.id === 0) {
    console.log("Libro id", this.libro.id)
    this.registrar();
  } else {
    console.log("Libro id", this.libro.id)
    this.actualizar();
  }
}




}



import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/Modelos/Genero';
import { Libro } from 'src/app/Modelos/Libro';
import { GeneroService } from 'src/app/services/genero.service';
import { LibrosService } from 'src/app/services/libros.service';
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
    estado: 0,
    genero: {
      id: 0,
      nombre: ""
    },
    usuario: {
      id: 0
    }
  }


  genero: Genero[] = []

  archivo: File;
  portada: File;


  constructor(private g: GeneroService, private l: LibrosService) {

  }



  estado: string[] = ['Activo', 'Inactivo'];

  ngOnInit() {
    this.g.listarGenero().subscribe(x => {
      this.genero = x
      console.log(x)
    })
  }

  onFileImage(event: any) {
    this.portada = event.target.files[0];
  }

  onFileDocument(event: any) {
    this.archivo = event.target.files[0];
  }



  mapEstado(estado: string): number {
    return estado === 'Activo' ? 1 : 2;
  }


  registrar() {
    /*this.libro.titulo = `${this.libro.titulo}`;*/
    
    this.l.registrarLibro(this.libro, this.archivo, this.portada)
      .subscribe(
        response => {
          // Éxito al registrar
          console.log(response);
          Swal.fire('¡Registrado correctamente!', '', 'success');
        },
        error => {
          // Manejar error
          console.error(error);
          Swal.fire('Error al registrar', 'Por favor, inténtalo de nuevo más tarde.', 'error');
        }
      );
  }



}





/*
onFileImage(event: any): void {
  this.selectedImage = event.target.files[0] ?? null;
}

onFileDocument(event: any): void {
  this.selectedDocument = event.target.files[0] ?? null;
}

*/


/*
  registrar(){
    
    console.log("codigo usuario "+this.libro.usuario.id)
   

    let estadoActual = `${this.libro.estado}`;

    this.libro.estado = this.mapEstado(estadoActual);
    
    console.log(estadoActual);
    console.log("codigo estado "+this.libro.estado);
    

    if (this.selectedDocument) {
      this.libro.archivo = this.selectedDocument.name; 
      console.log("Archivo "+this.libro.archivo);
    }
  
    if (this.selectedImage) {
      this.libro.portada = this.selectedImage.name;
      console.log("Portada "+this.libro.portada);
    }

    this.l.registrarLibro(this.libro, this.archivo, this.portada).subscribe((response)=> {
      console.log('Libro registrado', response);
    },
    (error) => {
      console.error('Error', error)
    })
  }

*/




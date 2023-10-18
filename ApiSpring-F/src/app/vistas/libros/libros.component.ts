import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/Modelos/Genero';
import { Libro } from 'src/app/Modelos/Libro';
import { GeneroService } from 'src/app/services/genero.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit{
  selectedImage: any = null;
  selectedDocument: any = null;
  
  libro: Libro = {
    id : 0,
    titulo: "",
    descripcion: "",
    autor: "",
    archivo: "",
    portada: "",
    registro:  0,
    estado: 0,
    genero:{
      id:0,
      nombre:""
    },
    usuario:{
      id:0
    }
  }
  

  genero: Genero[] = []


  constructor(private g: GeneroService, private l: LibrosService){

  }


  estado: string[] = ['Activo', 'Inactivo'];

  ngOnInit(){
    this.g.listarGenero().subscribe(x=>{
      this.genero = x
      console.log(x)
    })
  }

  onFileImage(event: any): void {
    this.selectedImage = event.target.files[0] ?? null;
  }

  onFileDocument(event: any): void {
    this.selectedDocument = event.target.files[0] ?? null;
  }

  mapEstado(estado: string): number {
    return estado === 'Activo' ? 1 : 2;
  }
  

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

    this.l.registrarLibro(this.libro).subscribe((response)=> {
      console.log('Libro registrado', response);
    },
    (error) => {
      console.error('Error', error)
    })
  }



}

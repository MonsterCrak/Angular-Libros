import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/Modelos/Genero';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit{
  selectedImage: any = null;
  selectedDocument: any = null;

  genero: Genero[] = []

  constructor(private g: GeneroService){

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



}

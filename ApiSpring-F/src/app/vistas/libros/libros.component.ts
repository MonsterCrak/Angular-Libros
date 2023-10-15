import { Component } from '@angular/core';
import { Genero } from 'src/app/Modelos/Genero';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {
  selectedImage: any = null;
  selectedDocument: any = null;

  genero: Genero[] = [
    { id: 0, nombre: 'Romance' }
  ]


  estado: string[] = ['Activo', 'Inactivo'];

  onFileImage(event: any): void {
    this.selectedImage = event.target.files[0] ?? null;
  }

  onFileDocument(event: any): void {
    this.selectedDocument = event.target.files[0] ?? null;
  }



}

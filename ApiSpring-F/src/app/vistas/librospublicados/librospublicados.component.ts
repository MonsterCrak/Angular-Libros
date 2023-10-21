import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/Modelos/Libro';
import { LibrosService } from 'src/app/services/libros.service';


@Component({
  selector: 'app-librospublicados',
  templateUrl: './librospublicados.component.html',
  styleUrls: ['./librospublicados.component.css'],
})
export class LibrospublicadosComponent implements OnInit  {

  libropublicados : Libro []= []

  isLiked: boolean = false;

  isFavorite: boolean = false;

  constructor(private l: LibrosService) {}

  ngOnInit() {
    this.l.listarLibros().subscribe(libros => {
      this.libropublicados = libros.map(libro => ({ ...libro, isLiked: false, isFavorite: false }));
      console.log(libros);
    });
  }

  toggleLike(libro: Libro) {
    libro.isLiked = !libro.isLiked;
    console.log(`Like status for libro ${libro.id}: ${libro.isLiked ? 'true' : 'false'}`);
  }
  

  toggleFavorite(libro: Libro) {
    libro.isFavorite = !libro.isFavorite;
    console.log(`Favorite status for libro ${libro.id}: ${libro.isFavorite ? 'true' : 'false'}`);
  }
  



}

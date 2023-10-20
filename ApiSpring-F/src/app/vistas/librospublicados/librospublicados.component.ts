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

  constructor(private l: LibrosService) {}

  ngOnInit() {
    this.l.listarLibros().subscribe(libros => {
      this.libropublicados = libros;
      console.log(libros);
    });
  }





}

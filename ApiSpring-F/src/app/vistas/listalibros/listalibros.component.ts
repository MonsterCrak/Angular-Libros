import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/Modelos/Libro';
import { LibrosService } from 'src/app/services/libros.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listalibros',
  templateUrl: './listalibros.component.html',
  styleUrls: ['./listalibros.component.css']
})

export class ListalibrosComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  libro: any;
  displayedColumns: string[] = ['titulo', 'autor', 'registro', 'genero', 'estado'];



  constructor(private l: LibrosService) {}



  ngOnInit() {
    this.l.listarLibros().subscribe(libros => {
      this.libro = new MatTableDataSource<Libro>(libros);
      this.libro.paginator = this.paginator;
      console.log(this.libro);
    });
  }



}




import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/Modelos/Libro';
import { LibrosService } from 'src/app/services/libros.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listalibros',
  templateUrl: './listalibros.component.html',
  styleUrls: ['./listalibros.component.css']
})

export class ListalibrosComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  libro: any;
  displayedColumns: string[] = ['titulo', 'autor', 'registro', 'genero', 'estado', 'actualizar', 'eliminar'];



  constructor(private l: LibrosService, private router:Router) {}



  ngOnInit() {
    this.l.listarLibros().subscribe(libros => {
      this.libro = new MatTableDataSource<Libro>(libros);
      this.libro.paginator = this.paginator;
      this.libro.sort = this.sort;

      console.log(this.libro);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.libro.filter = filterValue.trim().toLowerCase();

    if (this.libro.paginator) {
      this.libro.paginator.firstPage();
    }
  }


  editarLibro(libro: Libro) {
    this.router.navigate(['/inicio/libros/', libro.id]);

    console.log(`Editar libro con ID: ${libro.id}`);
  }
  
  eliminarLibro(libro: Libro) {
    // Aquí puedes implementar la lógica para eliminar el libro
    console.log(`Eliminar libro con ID: ${libro.id}`);
  }
  


  getEstadoStyle(estado: boolean): {texto: string, estilo: any} {
    if (estado) {
      return { texto: 'Activo', estilo: { 'font-weight': 'bold', color: 'green' } };
    } else {
      return { texto: 'Inactivo', estilo: { 'font-weight': 'bold', color: 'red' } };
    }
  }
  


}




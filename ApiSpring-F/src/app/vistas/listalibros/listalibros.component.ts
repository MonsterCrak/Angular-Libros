import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from 'src/app/Modelos/Libro';
import { LibrosService } from 'src/app/services/libros.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  noHayRegistros: boolean = false;


  ngOnInit() {
    this.l.listarLibros().subscribe(libros => {
      this.libro = new MatTableDataSource<Libro>(libros);
      this.libro.paginator = this.paginator;
      this.libro.sort = this.sort;

      console.log(this.libro);
      if (libros.length === 0) {
        this.noHayRegistros = true;
      }
    });
  }

  pdfSrc = "http://localhost:8092/api/libro/archivos/pdfs/4-a.pdf";


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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la acción, aquí puedes realizar la llamada a tu servicio para eliminar el libro
        this.l.eliminarLibro(libro.id).subscribe(
          () => {
            this.libro.data = this.libro.data.filter(l => l !== libro); // Actualiza la lista localmente
            Swal.fire(
              'Eliminado',
              'El libro ha sido eliminado correctamente',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el libro',
              'error'
            );
          }
        );
      }
    });
  }
  
  


  getEstadoStyle(estado: boolean): {texto: string, estilo: any} {
    if (estado) {
      return { texto: 'Activo', estilo: { 'font-weight': 'bold', color: 'green' } };
    } else {
      return { texto: 'Inactivo', estilo: { 'font-weight': 'bold', color: 'red' } };
    }
  }
  


}




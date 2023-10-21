import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../Modelos/Libro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  host: string = "http://localhost:8092/api/libro"

  constructor(private http: HttpClient) { }

  /*
  registrarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.host}/registrar`, libro);
  }
  */

  registrarLibro(libro: Libro, archivo: File, portada: File){

    const formData = new FormData();
  
    formData.append('archivo', archivo);
    formData.append('portada', portada);
    formData.append('titulo', libro.titulo);
    formData.append('descripcion', libro.descripcion);
    formData.append('autor', libro.autor);
    formData.append('estado', libro.estado? '1' : '0');
    formData.append('idGenero', libro.genero.id.toString());
    formData.append('idUsuario', libro.usuario.id.toString());
    console.log(formData);

    return this.http.post(`${this.host}/registrar`, formData);
  
  }

  public listarLibros():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.host+"/lista");
  }
}

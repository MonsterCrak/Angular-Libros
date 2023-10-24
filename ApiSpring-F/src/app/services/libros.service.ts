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


  public registrarLibro(libro: Libro, archivo: File, portada: File){

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

  public actualizarLibro(libro: Libro, archivo: File, portada: File) {
    const formData = new FormData();
  
    formData.append('archivo', archivo);
    formData.append('portada', portada);
    formData.append('titulo', libro.titulo);
    formData.append('descripcion', libro.descripcion);
    formData.append('autor', libro.autor);
    formData.append('estado', libro.estado ? '1' : '0');
    formData.append('idGenero', libro.genero.id.toString());
    formData.append('idUsuario', libro.usuario.id.toString());
    formData.append('idLibro', libro.id.toString());
  
    return this.http.put(`${this.host}/actualizar`, formData);
  }
  

  public buscarLibro(codigo: number): Observable<Libro> {
    const url = `${this.host}/buscar/${codigo}`;
    return this.http.get<Libro>(url);
  }


  public listarLibros():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.host+"/lista");
  }

  


}

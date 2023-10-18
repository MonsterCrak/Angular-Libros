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

  registrarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${this.host}/registrar`, libro);
  }

}

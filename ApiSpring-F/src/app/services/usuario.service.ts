import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Usuario } from '../Modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = "http://localhost:8092/api/usuario"

  constructor(private http: HttpClient) { }


  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/registrar', usuario)
      .pipe(
        catchError(this.handleError)
      );
  }


  actualizarUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/actualizar`, JSON.stringify(usuario), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public buscarLibro(codigo: number): Observable<Usuario> {
    const url = `${this.apiUrl}/buscar/${codigo}`;
    return this.http.get<Usuario>(url);
  }


  cambiarContrasena(id: number, request: any): Observable<any> {
    const url = `${this.apiUrl}/cambiar-clave/${id}`;
    return this.http.put(url, request);
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }


}

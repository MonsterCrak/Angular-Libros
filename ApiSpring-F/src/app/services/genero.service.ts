import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from '../Modelos/Genero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  host: string = "http://localhost:8092/api/genero"

  constructor(private http: HttpClient) { }

  public listarGenero():Observable<Genero[]>{
    return this.http.get<Genero[]>(this.host+"/lista");
  }

}

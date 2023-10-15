import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  host:string="http://localhost:8092/api/"

  constructor(private http:HttpClient) { }



}

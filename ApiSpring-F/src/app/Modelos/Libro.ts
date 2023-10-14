import { Favoritos } from "./Favoritos"
import { Usuario } from "./Usuario"
import { Vistas } from "./Vistas"

 
export class Libro {
    id: number 
    titulo: string 
    descripcion: string 
    autor: string
    archivo: string
    registro: number
    estado:number
    Usuario:Usuario
    Vistas : Vistas
    Favoritos:Favoritos
}
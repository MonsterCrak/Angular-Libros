import { Favoritos } from "./Favoritos"
import { Genero } from "./Genero"
import { Usuario } from "./Usuario"
import { Vistas } from "./Vistas"

 
export class Libro {
    id: number 
    titulo: string 
    descripcion: string 
    autor: string
    archivo: string
    portada: string
    registro: number
    estado:boolean
    usuario?: Usuario
    vistas? : Vistas
    favoritos?: Favoritos
    genero?: Genero
    isLiked: boolean = false;
    isFavorite: boolean = false;

}
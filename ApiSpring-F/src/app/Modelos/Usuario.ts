import { Libro } from "./Libro"
import { Rol } from "./Rol"

export class Usuario {
    id: number 
    nombre?: string 
    email?: string 
    clave?: string
    registro?: string
    estado?: number
    rol?:Rol
    libros? : Libro
}
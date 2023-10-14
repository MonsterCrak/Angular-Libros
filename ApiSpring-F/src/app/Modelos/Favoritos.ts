import { Libro } from "./Libro"
import { Usuario } from "./Usuario"

export class Favoritos {
    id: number
    favorito: string
    estado:number
    Usuario:Usuario
    Libro:Libro
}

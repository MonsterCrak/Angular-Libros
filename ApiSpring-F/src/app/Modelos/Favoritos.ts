import { Libro } from "./Libro"
import { Usuario } from "./Usuario"

export class Favoritos {
    id: number
    favorito: string
    estado:boolean
    Usuario:Usuario
    Libro:Libro
}

import { HttpClient } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';



import { LoginUsuario } from '../Modelos/LoginUsuario';
import { JwtDto } from '../Modelos/jwt-dto';
import { TokenService } from './token.service';
import { Usuario } from '../Modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string = "http://localhost:8092/api/"

  constructor(private http: HttpClient, private tokenServices: TokenService) { }

  public login(user: LoginUsuario): Observable<any> {
    return this.http.post<JwtDto>(this.host + "login", user).pipe(tap(data => {
      this.tokenServices.setIdUsuario(data.idUsuario);
    }))
  }


  /*
  public recuperar(user:RecuperarUsuario):Observable<any>{
    return this.http.post<string>(this.host+"recuperar",user)
  }
  */
  public enviarCorreo(correo: string): Observable<any> {
    return this.http.post<string>(this.host + "mail/" + correo, null)
  }
}

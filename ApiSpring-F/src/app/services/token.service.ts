import { Injectable } from '@angular/core';
import { Enlace } from '../Modelos/Enlace';


const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ENLACES_KEY = 'AuthEnlaces';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string>=[];
  enlaces: Enlace[]=[];

  constructor() { }
  public setToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }
  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public setUsername(username:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY)
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }
  public getUsername():string{
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY)
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }
  public getAuthorities():string[]{
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).
      forEach(authority =>{
        this.roles.push(authority.authority)
      })
    }
    return this.roles;
  }
  public getEnlaces():Enlace[]{
    if(sessionStorage.getItem(ENLACES_KEY)){
      JSON.parse(sessionStorage.getItem(ENLACES_KEY)).
      forEach(enlace =>{
        this.enlaces.push(enlace)
      })
    }
    return this.enlaces;
  }
  public setEnlaces(enlaces:Enlace[]):void{
    window.sessionStorage.removeItem(ENLACES_KEY)
    window.sessionStorage.setItem(ENLACES_KEY,JSON.stringify(enlaces));
  }
  public logOut():void{
    window.sessionStorage.clear()
  }
}

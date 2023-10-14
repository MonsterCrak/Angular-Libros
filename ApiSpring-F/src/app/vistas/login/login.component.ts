import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/Modelos/LoginUsuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilesService } from 'src/app/services/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isLogin=false
  isLoginFail=false
  user:LoginUsuario=null;
  email:string
  clave:string
  roles:string[] = [];
  error_message:string;

  constructor(
    private router: Router,
    private SToken:TokenService,
    private SAuth:AuthService,
    private SUtiles:UtilesService
  ){}

  navigateToCustomPage(){
    this.router.navigateByUrl("/login");
  }

    
  ngOnInit(){

    if(this.SToken.getToken()){
      this.isLogin=true;
      this.isLoginFail=false;
      this.roles=this.SToken.getAuthorities();
    }

    this.SUtiles.password_event();

  }


 
  onLogin():void{
    this.user = new LoginUsuario(this.email,this.clave);
    console.log(this.user.email + " y " + this.user.clave)
    this.SAuth.login(this.user).subscribe(
      data => {
        this.isLogin = true;
        this.isLoginFail = false;
        this.SToken.setToken(data.token)
        this.SToken.setUsername(data.username)
        this.SToken.setAuthorities(data.authorities)
        this.SToken.setEnlaces(data.enlaces)
        this.roles = data.authorities;

        console.log(this.user.email + " y " + this.user.clave)
        this.router.navigate(["/inicio"])
      },
      err =>{
        this.isLogin = false
        this.isLoginFail = true
        this.error_message = "Usuario y/o contraseña incorrecta"
        Swal.fire("Error de Login",this.error_message,"error")
        console.log(this.user.email + " y " + this.user.clave)
      }
    )
  }

}

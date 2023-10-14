import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Enlace } from '../Modelos/Enlace';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  nombre:string="";
  enlaces:Array<Enlace>=new Array<Enlace>;

  constructor(private cdr:ChangeDetectorRef, private SToken:TokenService, private router:Router,private observer: BreakpointObserver) {}
  
  ngOnInit(): void {
    this.nombre = this.SToken.getUsername();
    this.enlaces = this.SToken.getEnlaces();
  }

  logout():void{
    this.SToken.logOut();
    this.router.navigate(["/login"]);
    setTimeout(() => {
      window.location.reload();
    },5); 
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}

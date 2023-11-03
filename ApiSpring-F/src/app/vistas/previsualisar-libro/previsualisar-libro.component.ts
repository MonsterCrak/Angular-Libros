import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previsualisar-libro',
  templateUrl: './previsualisar-libro.component.html',
  styleUrls: ['./previsualisar-libro.component.css']
})
export class PrevisualisarLibroComponent {



  constructor(private router: Router){

  }


  verLibro(){

    this.router.navigate(['/inicio/ver-libro']);

  }

}

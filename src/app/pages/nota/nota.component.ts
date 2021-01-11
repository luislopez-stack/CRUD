import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import { notaModel } from '../../models/nota.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  nota = new notaModel


  constructor( private notaServices : NotasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo'){
      this.notaServices.getNotaById( id ).subscribe( (rsp: notaModel) => {
        this.nota = rsp;
        this.nota.id = id;
      })
    }
  }


  guardar( forma: NgForm){

    if (forma.invalid){
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere...',
      text: 'Guardando!',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.nota.id){
      peticion = this.notaServices.putNota( this.nota);
    }else{
      peticion = this.notaServices.postNota( this.nota);
    }

    peticion.subscribe( rsp => {

      Swal.fire({
        icon: 'success',
        title: this.nota.nombre,
        text: 'Guardando!'
      });
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import { notaModel } from '../../models/nota.model';
import { timestamp } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  notas: notaModel[] = [];
  cargando = false;

  constructor(private notaService: NotasService) { }

  ngOnInit(): void {

    this.cargando = true;

    this.notaService.getNotas()
    .subscribe( rsp => {
      console.log(rsp);
      this.notas = rsp;
      this.cargando = false;
    });

  }


  deleteNota( nota  : notaModel, i: number ){

    Swal.fire({
      icon: 'question',
      title: 'Quieres borrar nota?',
      text: `Quieres borrar nota ${ nota.nombre }?`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if (resp.value) {
        this.notas.splice(i,1);
        this.notaService.deleteNotaById( nota.id ).subscribe();
      }
    });


  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notaModel } from '../models/nota.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private url = 'https://crudnotas-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }


  postNota( nota: notaModel){

    return this.http.post(`${ this.url }/notas.json`, nota)
            .pipe(
              map( (rsp: any) => {
                nota.id = rsp.name;
                return nota;
              })
            );
  }

  putNota( nota: notaModel){

    const camposNota = {
      ...nota
    };

    delete camposNota.id;

    return this.http.put(`${ this.url }/notas/${ nota.id }.json`, camposNota);
  }


  deleteNotaById( id: string){
    return this.http.delete(`${ this.url }/notas/${ id }.json`);
  }


  getNotaById( id: string){
    return this.http.get(`${ this.url }/notas/${ id }.json`);
  }

  getNotas( ){

    return this.http.get(`${ this.url }/notas.json`)
            .pipe(
              map( rsp => this.crearArregloNotas(rsp)),
              delay(1500)
            );
  }


  private crearArregloNotas (NotasObj: object){
    const notas: notaModel[] = [];
    console.log(NotasObj);

    if( NotasObj === null ){ return [];}

    Object.keys( NotasObj ).forEach( key => {
      const nota: notaModel = NotasObj[key];
      nota.id = key;

      notas.push(nota);

    });
    return notas;
  }

}

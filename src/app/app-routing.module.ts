import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotaComponent } from './pages/nota/nota.component';
import { NotasComponent } from './pages/notas/notas.component';

const routes: Routes = [
  {path: 'nota/:id', component: NotaComponent},
  {path: 'notas', component: NotasComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'notas'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../../todo/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = [ 'todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { 

    this.store.subscribe( state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });

  }

  ngOnInit() {
  }

  cambiarFiltro(filtro: fromFiltro.filtrosValidos){
    let accion = new fromFiltro.SetFiltroAction(filtro);
    this.store.dispatch(accion);
  }

  contarPendientes( todos: Todo[]){
    this.pendientes = todos.filter( todo => !todo.completado).length; 
  }

  limpiarCompletados(){
    let accion = new fromTodo.BorrarCompletadosTodoAction();
    this.store.dispatch(accion);
  }

}

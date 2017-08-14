import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({  })
export class TodoComponent implements OnInit {
  todos$: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {}

  ngOnInit() {
   this.todos$ = this.af.list('/api-list');
  }

  addTodo(value: string): void {
   this.todos$.push({ content: value, done: false });
  }
  deleteTodo(todo: any): void {
    this.af.object('/api-list/' + todo.$key).remove();
  }

  toggleDone(todo: any): void {
    // write code to toggle a todo.
  }

  updateTodo(todo: any, newValue: string): void {
    // update the current list
  }
}

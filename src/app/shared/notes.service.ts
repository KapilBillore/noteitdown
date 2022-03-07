import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();
  localItem:string;

  constructor() {
    if(localStorage.getItem("notes")==null){
      this.notes=[];
    }
    else{
      this.notes=JSON.parse(localStorage.getItem("notes"));
    }
   }

  get(id:number){
    return this.notes[id];
  }

  getAll(){
    return this.notes;
  }

  getId(note:Note){
    this.notes.indexOf(note);
  }

  add(note:Note){
    let newlength=this.notes.push(note);
    let index =newlength-1;

    localStorage.setItem("notes",JSON.stringify(this.notes));

    return index;
  }

  update(id:number, title:string, body:string){
    let note=this.notes[id];
    note.title=title;
    note.body=body;
    localStorage.setItem("notes",JSON.stringify(this.notes));

  }

  delete(id:number){
    this.notes.splice(id, 1);
    localStorage.setItem("notes",JSON.stringify(this.notes));
  }
}

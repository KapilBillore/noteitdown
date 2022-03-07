import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>()
  filteredNotes:Note[] = new Array<Note>();

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getAll();
    this.filteredNotes=this.notes;
  }

  deleteNote(id: number) {
    this.noteService.delete(id);
  }

  filter(query: string) {

    let allResults: Note[] = new Array<Note>();

    query = query.toLowerCase().trim();

    //split serach string to word on space
    let terms: string[] = query.split(" ");

    //remove duplicates
    terms = this.removeDuplicates(terms);

    //compile all results into all another array
    terms.forEach(term => {
      let results = this.relevantNotes(term);

      //merge to all results aray

      allResults = [...allResults, ...results];
    });

    let uniqueResults= this.removeDuplicates(allResults);
    this.filteredNotes=uniqueResults;

  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: any): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;

    });

    return relevantNotes;
  }



}

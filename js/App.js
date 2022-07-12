import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notesView = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    this.notes = [];
    this.activeNote = null;
    this.notesLength = null;

    const notes = NotesAPI.getNotes();
    this.notes = notes;
    //number of notes
    const noteslength = notes.length;
    
    this.notesView.updateNoteList(notes, noteslength);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
    this.notesView.updateAppContentPreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.notesView.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "new note",
          body: "new body",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },

      onNoteSelect: (noteId) => {
        const activedNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNote(activedNote);
      },

      onNotedelete: (noteId) => {
        NotesAPI.deleteNotes(noteId);
        this._refreshNotes();
      },
    };
  }
}

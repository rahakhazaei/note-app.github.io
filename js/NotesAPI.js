const notes = [
  {
    id: 1,
    title: "first note",
    body: "this is my first note",
    updated: "2022-07-01T05:32:10.429Z",
  },
  {
    id: 2,
    title: "second note",
    body: "this is my secon note",
    updated: "2022-07-01T05:33:56.490Z",
  },

  {
    id: 3,
    title: "third note",
    body: "this is my third note",
    updated: "2022-07-01T05:47:24.239Z",
  },
];

export default class NotesAPI {
  static getNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    // savedNotes = notes;
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(note) {
    // note exist or new note
    const notes = NotesAPI.getNotes();
    const savedNote = notes.find((n) => n.id === note.id);
    if (savedNote) {
      savedNote.updated = new Date().toISOString();
      savedNote.title = note.title;
      savedNote.body = note.body;
    } else {
      note.id = new Date().getTime();
      note.updated = new Date().toISOString();
      notes.push(note);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
    // save number of notes
    const numberOfNotes = notes.length;
    localStorage.setItem("notes-number", JSON.stringify(numberOfNotes));
  }

  static deleteNotes(id) {
    const notes = NotesAPI.getNotes();
    const filterdNote = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filterdNote));
  }
}

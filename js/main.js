
import App from "./App.js"
const root = document.getElementById("app");

const app = new App(root);

// notesView.updateNoteList(NotesAPI.getNotes());

// notesView.updateActiveNote(NotesAPI.getNotes()[1]);

// toggle mini-nav class
const nav = document.querySelector(".nav");
document.querySelector(".toggler").addEventListener("click", () => {
  nav.classList.toggle("mini-nav");
});

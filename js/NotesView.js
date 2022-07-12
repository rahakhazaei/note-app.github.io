export default class NotesView {
  constructor(app, handlers) {
    this.root = app;

    const { onNoteAdd, onNoteEdit, onNoteSelect, onNotedelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNotedelete = onNotedelete;

    this.root.innerHTML = `
        <div class="nav">
        <div class="nav__title">
          <h1>NOTE APP</h1>
        </div>
        <div class="nav__items"></div>
        <div class="nav__btn">
          <button class="nav__add-btn noteAddBtn">
            <span class="nav__add-btn-text">Add Note</span>
            <i class="fas fa-plus nav__add-btn-icon"></i>
          </button>
        </div>
        <span class="toggler">
          <i class="fa fa-chevron-left"></i>
        </span>
      </div>
      <div class="app-content">
        <form action="" class="note-items">
          <input
            class="note-title"
            type="text"
            name="noteTitle"
            id="noteTitle"
            placeholder="New Note"
          />
          <textarea
            class="note-description"
            name="noteDescription"
            id="noteDescription"
            placeholder="...take Note"
            cols="30"
            rows="20"
          ></textarea>
        </form>
      </div>   `;

    const noteAddBtn = this.root.querySelector(".noteAddBtn");
    const inputTitle = this.root.querySelector(".note-title");
    const inputBody = this.root.querySelector(".note-description");

    noteAddBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    //visible or hide app content
    this.updateAppContentPreviewVisibility(false);
  }

  _createNaveItemHTML(id, title, body, updated, notesNumber) {
    const MAX_NOTE_LENGTH = 50;
    return `
    <div class="nav__item" data-nav-id="${id}">
    <div class="nav__item-header">
                    <h2 class="nav__item-title">${title}</h2>
                    <span class="nav__item-trash" data-nav-id=${id}>
                    <i class="far fa-trash-alt"></i></span>
                    </div>
            <span class="nav__item-cover">Note.${notesNumber}</span>
            <span class="nav__item-description">
            ${body.substring(0, MAX_NOTE_LENGTH)}
            ${body.length > MAX_NOTE_LENGTH ? "..." : ""}
            </span>
            <span class="nav__item-date">
            ${new Date(updated).toLocaleString("en", {
              dateStyle: "full",
              timeStyle: "short",
            })}
            </span>
          </div>
    `;
  }

  updateNoteList(notes, notesLength) {
    const NoteItemsContainer = this.root.querySelector(".nav__items");
    NoteItemsContainer.innerHTML = "";
    let navItems = "";
    let notesNumber = notesLength;
    for (const note of notes) {
      const { id, title, body, updated } = note;
      const html = this._createNaveItemHTML(id, title, body, updated, notesNumber);
      navItems += html;
      notesNumber--;
    }
    NoteItemsContainer.innerHTML = navItems;
    NoteItemsContainer.querySelectorAll(".nav__item").forEach((item) => {
      item.addEventListener("click", () => {
        this.onNoteSelect(item.dataset.navId);
      });
    });

    NoteItemsContainer.querySelectorAll(".nav__item-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNotedelete(item.dataset.navId);
      });
    });
  }

  updateActiveNote(note) {
    // 1. add notes__item-selected class
    // 2. show selected item title and body in form
    this.root.querySelectorAll(".nav__item").forEach((item) => {
      item.classList.remove("nav__item--selected");
    });
    this.root
      .querySelector(`.nav__item[data-nav-id="${note.id}"]`)
      .classList.add("nav__item--selected");

    document.querySelector(".note-title").value = note.title;
    document.querySelector(".note-description").value = note.body;
  }

  updateAppContentPreviewVisibility(visible) {
    this.root.querySelector(".app-content").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}

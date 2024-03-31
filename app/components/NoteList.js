import {
  getSortedByCreateAtAsc,
  getSortedByCreateAtDesc,
} from "../controller/NotesHandler.js";

const template = document.createElement("template");
template.innerHTML = `
<div class="header-option">
    <button class="see-unarchive-btn"><span class="material-symbols-outlined">unarchive</span>Lihat Unarchive Notes</button>
    <button class="see-archive-btn"><span class="material-symbols-outlined">archive</span>Lihat Archive Notes</button>
    <button class="new-note-btn">
        <i class="bi bi-journal-bookmark-fill"></i>
        <span>Baru</span>
    </button>
    <sort-note>
        <sort-mode slot="sort-mode" value="terbaru" bs-icon="bi bi-sort-up" text="Terbaru"></sort-mode>
        <sort-mode slot="sort-mode" value="terlama" bs-icon="bi bi-sort-down-alt"
            text="Terlama"></sort-mode>
    </sort-note>
</div>
<div class="notes-container"></div>
`;

export class NoteList extends HTMLElement {
  static observedAttributes = [
    "selected-note-item",
    "active-note-item",
    "folder-type",
    "refresh",
    "sort-by",
  ];

  constructor() {
    super();
    this.element = template.content.cloneNode(true);
    this.archiveBtn = this.element.querySelector(".see-archive-btn");
    this.unarchiveBtn = this.element.querySelector(".see-unarchive-btn");
  }

  connectedCallback() {
    this.appendChild(this.element);
    this.element = this;
    this.archiveBtn = this.querySelector(".see-archive-btn");
    this.unarchiveBtn = this.querySelector(".see-unarchive-btn");
    this.runNewNoteEvent();
    this.runSortChangeEvent();
    this.runArchiveToggle();
  }

  renderNotes() {
    const notesContainer = this.element.querySelector(".notes-container");
    notesContainer.innerHTML = "";

    const loader = document.querySelector("#loader").content.cloneNode(true);
    notesContainer.appendChild(loader);

    if (this.getAttribute("folder-type") == "archive") {
      if (this.getAttribute("sort-by") == "terbaru") {
        getSortedByCreateAtDesc("archive")
          .then((result) => {
            this.renderArchiveNotes(result);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        getSortedByCreateAtAsc("archive")
          .then((result) => {
            this.renderArchiveNotes(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      if (this.getAttribute("sort-by") == "terbaru") {
        getSortedByCreateAtDesc("unarchive")
          .then((result) => {
            this.renderUnarchiveNotes(result);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        getSortedByCreateAtAsc("unarchive")
          .then((result) => {
            this.renderUnarchiveNotes(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  renderUnarchiveNotes(notes = null) {
    const notesContainer = this.element.querySelector(".notes-container");
    this.archiveBtn.style.display = "";
    this.unarchiveBtn.style.display = "none";
    notesContainer.innerHTML = "";
    if (notes.length >= 1) {
      notes.forEach((obj) => {
        const note_item = document.createElement("note-item");
        note_item.setAttribute("note-item-id", obj.id);
        notesContainer.appendChild(note_item);
      });
    } else {
      notesContainer.innerHTML = `
                    <div style="margin:auto 0; text-align:center;">Tidak ada notes, ingin membuat notes baru?</div>
                `;
    }
  }

  renderArchiveNotes(notes = null) {
    const notesContainer = this.element.querySelector(".notes-container");
    this.archiveBtn.style.display = "none";
    this.unarchiveBtn.style.display = "";
    notesContainer.innerHTML = "";
    if (notes.length >= 1) {
      notes.forEach((obj) => {
        const note_item = document.createElement("note-item");
        note_item.setAttribute("note-item-id", obj.id);
        notesContainer.appendChild(note_item);
      });
    } else {
      notesContainer.innerHTML = `
                    <div style="margin:auto 0; text-align:center;">Tidak ada notes yang diarsipkan</div>
                `;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "selected-note-item":
        break;
      case "sort-by":
        this.renderNotes();
        break;
      case "folder-type":
        this.renderNotes();
        document.querySelector('note-detail').setAttribute('note-id', '')
        break;
      case "refresh":
        if (newValue == "true") {
          this.renderNotes();
          this.removeAttribute(name);
        }
        break;
      case "active-note-item":
        const allActive = this.querySelectorAll(".is-active");
        if (allActive != null) {
          for (const active of allActive) {
            active.classList.remove("is-active");
          }
        }
        const activeNow = this.querySelector(newValue);
        activeNow.classList.add("is-active");
        break;
      default:
        break;
    }
  }

  runSortChangeEvent() {
    const sort_note = this.querySelector("sort-note");
    sort_note.addEventListener("sort-changed", (event) => {
      document
        .querySelector("note-list")
        .setAttribute("sort-by", event.detail.sortMode);
    });
  }

  runNewNoteEvent() {
    const btn = this.querySelector(".new-note-btn");
    btn.addEventListener("click", () => {
      document.querySelector("note-detail").setAttribute("note-id", "new");
      document.querySelector("input#detail-title").focus();
    });
  }

  runArchiveToggle() {
    this.archiveBtn.addEventListener("click", () =>
      this.setAttribute("folder-type", "archive"),
    );
    this.unarchiveBtn.addEventListener("click", () =>
      this.setAttribute("folder-type", "unarchive"),
    );
  }
}

import { getSortedByCreateAtAsc, getSortedByCreateAtDesc, notesData } from "../../notes-data.js";
import { getNotes } from "../controller/NotesHandler.js";

const template = document.createElement('template')
template.innerHTML = `
<div class="header-option">
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
`

export class NoteList extends HTMLElement {
    static observedAttributes = [
        "selected-note-item",
        "active-note-item",
        'refresh',
        // "sort-by"
    ];

    constructor() {
        super()
    }

    connectedCallback() {
        this.appendChild(template.content.cloneNode(true))
        this.renderNotes()
        this.runNewNoteEvent()
        this.runSortChangeEvent()
    }

    renderNotes() {
        const notesContainer = this.querySelector('.notes-container');
        notesContainer.innerHTML = '';
        getNotes().then(notes => {
            if (notes.data.length >= 1) {
                notes.data.forEach(obj => {
                    const note_item = document.createElement('note-item');
                    note_item.setAttribute('note-item-id', obj.id);
                    notesContainer.appendChild(note_item);
                });
            } else {
                notesContainer.innerHTML = (`
                        <div style="margin:auto 0; text-align:center;">Tidak ada notes, ingin membuat notes baru?</div>
                    `)
            }
        }).catch(error => {
            console.error('Error rendering notes:', error)
            notesContainer.innerHTML = (`
                        <div style="margin:auto 0; text-align:center;">Tidak ada notes, ingin membuat notes baru?</div>
                    `)
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'selected-note-item':
                break
            case 'sort-by':
                this.renderNotes()
                break
            case 'refresh':
                if (newValue == 'true') {
                    this.renderNotes()
                    this.removeAttribute(name)
                }
                break
            case 'active-note-item':
                const allActive = this.querySelectorAll('.is-active')
                if (allActive != null) {
                    for (const active of allActive) {
                        active.classList.remove('is-active')
                    }
                }
                const activeNow = this.querySelector(newValue)
                activeNow.classList.add('is-active')
                break
            default:
                break;
        }
    }

    runSortChangeEvent() {
        const sort_note = this.querySelector('sort-note');
        sort_note.addEventListener('sort-changed', event => {
            document.querySelector('note-list').setAttribute('sort-by', event.detail.sortMode)
        });
    }

    runNewNoteEvent() {
        const btn = this.querySelector('.new-note-btn')
        btn.addEventListener('click', () => {
            document.querySelector('note-detail').setAttribute('note-id', 'new')
        })
    }
}

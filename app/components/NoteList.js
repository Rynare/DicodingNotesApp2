import { getSortedByCreateAtAsc, getSortedByCreateAtDesc, notesData } from "../../notes-data.js";
import { getNotes } from "../controller/NotesController.js";
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
        this.render()
    }


    async render() {
        this.innerHTML = '';
        try {
            let notes = await getNotes();
            if (notes.data.length >= 1) {
                notes.data.forEach(obj => {
                    const note_item = document.createElement('note-item');
                    note_item.setAttribute('note-item-id', obj.id);
                    this.appendChild(note_item);
                });
            } else {
                this.innerHTML = `
                    <div style="margin:auto 0; text-align:center;">Tidak ada notes, ingin membuat notes baru?</div>
                `;
            }
        } catch (error) {
            console.error('Error rendering notes:', error);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'selected-note-item':
                break
            case 'sort-by':
                this.render()
                break
            case 'refresh':
                if (newValue == 'true') {
                    this.render()
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
}

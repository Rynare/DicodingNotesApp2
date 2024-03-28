import { findNoteById, formatDate } from '../../notes-data.js'
import { deleteNote, getNoteById, setArchiveNote } from '../controller/NotesHandler.js'
import { NoteOption } from './NoteOption.js'
customElements.define('note-option', NoteOption)

const template = document.createElement('template')
template.innerHTML = `
<div style="position: relative">
    <div class="note-item-card">
        <p class="note-item-title">Title</p>
        <p class="note-item-body">Body</p>
        <p class="note-item-createAt">Created At:</p>
    </div>
    <note-option style="position:absolute; color: black; top:20px; right:20px; border-radius: 100%; width: 24px; height: 24px; display:flex; align-items:center; justify-content:center;">
        <note-option-menu slot="option-menu" value="hapus" bs-icon="bi bi-trash" text="Hapus" style="background-color:red;  padding: 4px 10px;border-radius:4px; color:white;"></note-option-menu>
        <note-option-menu slot="option-menu" value="arsipkan" bs-icon="bi bi-folder" text="Archive"  style="background-color:orange; padding: 4px 10px;border-radius:4px; color:white;"></note-option-menu>
    </note-option>
</div>
`

export class NoteItem extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.id = this.getAttribute('note-item-id')
        this.render()
    }

    render() {
        const newTemplate = template.content.cloneNode(true);

        getNoteById(this.id).then(
            result => {
                // console.log('note-item', result.data.id)
                const note_card = newTemplate.querySelector('.note-item-card')
                const note_option = newTemplate.querySelector('note-option')
                const note_title = newTemplate.querySelector('.note-item-title')
                const note_body = newTemplate.querySelector('.note-item-body')
                const note_createAt = newTemplate.querySelector('.note-item-createAt')

                note_title.innerText = result.data.title
                note_body.innerText = result.data.body
                note_createAt.innerText = formatDate(result.data.createdAt).replace('pukul', ' | ')

                this.runClickEvent(note_card)
                this.runOptionEvent(note_option)

                // console.log('note-item', result.data.id, 'end')
                this.appendChild(newTemplate);
            }
        )

    }

    runClickEvent(element) {
        element.addEventListener('click', (event) => {
            const note_detail = document.querySelector('note-detail')
            note_detail.setAttribute('note-id', this.id)
            this.parentElement.setAttribute('active-note-item', `[note-item-id=${this.id}]`)
        })
    }

    runOptionEvent(element) {
        element.addEventListener('note-option-changed', event => {
            switch (event.detail.noteOption) {
                case 'hapus':
                    deleteNote(this.id).then(result => {
                        if (result.status = 'success') {
                            document.querySelector('note-list').setAttribute('refresh', true)
                        }
                    }).catch(error => console.error(error))
                    break;
                case 'arsipkan':
                    setArchiveNote(this.id).then(result => {
                        if (result.status = 'success') {
                            document.querySelector('note-list').setAttribute('refresh', true)
                        }
                    }).catch(error => console.error(error))
                    break;
                default:
                    break;
            }
        })
    }
}

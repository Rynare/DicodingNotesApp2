import { findNoteById, formatDate } from '../../notes-data.js'
import { getNoteById } from '../controller/NotesController.js'

const template = document.createElement('template')
template.innerHTML = `
<div>
    <p class="note-item-title">Title</p>
    <p class="note-item-body">Body</p>
    <p class="note-item-createAt">Created At:</p>
</div>
`

export class NoteItem extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
        this.runClickEvent()
    }

    async render() {
        const newTemplate = template.content.cloneNode(true);

        const note = await getNoteById(this.getAttribute('note-item-id'))

        const note_title = newTemplate.querySelector('.note-item-title')
        const note_body = newTemplate.querySelector('.note-item-body')
        const note_createAt = newTemplate.querySelector('.note-item-createAt')

        note_title.innerText = note.data.title
        note_body.innerText = note.data.body
        note_createAt.innerText = formatDate(note.data.createdAt).replace('pukul', ' | ')

        this.appendChild(newTemplate);
    }

    runClickEvent() {
        this.addEventListener('click', (event) => {
            const note_detail = document.querySelector('note-detail')
            note_detail.setAttribute('note-id', this.getAttribute('note-item-id'))
            this.parentElement.setAttribute('active-note-item', `[note-item-id=${this.getAttribute('note-item-id')}]`)
        })
    }
}

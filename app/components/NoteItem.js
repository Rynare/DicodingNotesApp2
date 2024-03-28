import { findNoteById, formatDate } from '../../notes-data.js'
import { getNoteById } from '../controller/NotesHandler.js'

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

    render() {
        const newTemplate = template.content.cloneNode(true);

        getNoteById(this.getAttribute('note-item-id')).then(
            result => {
                // console.log('note-item', result.data.id)
                const note_title = newTemplate.querySelector('.note-item-title')
                const note_body = newTemplate.querySelector('.note-item-body')
                const note_createAt = newTemplate.querySelector('.note-item-createAt')

                note_title.innerText = result.data.title
                note_body.innerText = result.data.body
                note_createAt.innerText = formatDate(result.data.createdAt).replace('pukul', ' | ')

                // console.log('note-item', result.data.id, 'end')
                this.appendChild(newTemplate);
            }
        )

    }

    runClickEvent() {
        this.addEventListener('click', (event) => {
            const note_detail = document.querySelector('note-detail')
            note_detail.setAttribute('note-id', this.getAttribute('note-item-id'))
            this.parentElement.setAttribute('active-note-item', `[note-item-id=${this.getAttribute('note-item-id')}]`)
        })
    }
}

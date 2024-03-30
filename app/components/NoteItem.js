import { findNoteById, formatDate } from '../../notes-data.js'
import { deleteNote, getNoteById, setArchiveNote, setUnarchiveNote } from '../controller/NotesHandler.js'
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

                const archive_btn = `
                    <note-option-menu slot="option-menu" class="archive-toggle" value="archive" bs-icon="bi bi-folder" text="Archive"  style="background-color:orange; padding: 4px 10px;border-radius:4px; color:white;"></note-option-menu>
                    `

                const unarchive_btn = `
                    <note-option-menu slot="option-menu" class="archive-toggle" value="unarchive" bs-icon="bi bi-folder" text="Unarchive"  style="background-color:orange; padding: 4px 10px;border-radius:4px; color:white;"></note-option-menu>
                    `

                if (document.querySelector('note-list').getAttribute('folder-type') == 'archive') {
                    note_option.innerHTML += unarchive_btn
                } else {
                    note_option.innerHTML += archive_btn
                }

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
                    if (confirm('Yakin ingin menghapus note/catatan ini?')) {
                        deleteNote(this.id).then(result => {
                            if (result.status = 'success') {
                                document.querySelector('note-list').setAttribute('refresh', true)
                            }
                        }).catch(error => console.error(error))
                    }
                    break;
                case 'archive':
                    if (confirm('Yakin ingin mengarsipkan note/catatan ini?')) {
                        setArchiveNote(this.id).then(result => {
                            if (result.status = 'success') {
                                document.querySelector('note-list').setAttribute('refresh', true)
                            }
                        }).catch(error => console.error(error))
                    }
                    break;
                case 'unarchive':
                    if (confirm('Yakin ingin mengeluarkan note/catatan ini dari arsip?')) {
                        setUnarchiveNote(this.id).then(result => {
                            if (result.status = 'success') {
                                document.querySelector('note-list').setAttribute('refresh', true)
                            }
                        }).catch(error => console.error(error))
                    }
                    break;
                default:
                    break;
            }
        })
    }
}
